/**
 * Wallet handler utility to safely manage cryptocurrency wallet connections
 * and prevent errors from breaking the application
 */

// Type definitions for wallet providers
interface EthereumProvider {
  isMetaMask?: boolean;
  request?: (args: { method: string; params?: any[] }) => Promise<unknown>;
  on?: (event: string, handler: (...args: any[]) => void) => void;
  removeListener?: (event: string, handler: (...args: any[]) => void) => void;
}

declare global {
  interface Window {
    ethereum?: EthereumProvider;
    web3?: any;
  }
}

/**
 * Safely checks if a wallet provider is available
 * @returns Boolean indicating if wallet provider is available
 */
export const isWalletAvailable = (): boolean => {
  try {
    return typeof window !== 'undefined' && !!window.ethereum;
  } catch (error) {
    console.warn('Error checking wallet availability:', error);
    return false;
  }
};

/**
 * Safely attempts to connect to a wallet provider
 * @returns Promise resolving to account address or null if failed
 */
export const connectWallet = async (): Promise<string | null> => {
  try {
    // Check if window is defined (browser environment)
    if (typeof window === 'undefined') {
      console.warn('Window is not defined');
      return null;
    }
    
    if (!isWalletAvailable()) {
      console.warn('No wallet provider available');
      return null;
    }

    // Request account access
    if (window.ethereum && window.ethereum.request) {
      const accounts = await window.ethereum.request({ 
        method: 'eth_requestAccounts' 
      }) as string[];
      
      return accounts && accounts.length > 0 ? accounts[0] : null;
    }
    
    return null;
  } catch (error: any) {
    // Handle specific error cases
    if (error.code === 4001) {
      console.warn('Wallet connection rejected by user');
    } else if (error.code === -32002) {
      console.warn('Wallet connection request already pending');
    } else {
      console.warn('Error connecting to wallet:', error.message || error);
    }
    return null;
  }
};

/**
 * Initializes wallet error handling
 */
export const initializeWalletErrorHandler = (): void => {
  // Check if window is defined (browser environment)
  if (typeof window === 'undefined') return;

  // Add global error handler for wallet-related errors
  const handleError = (message: string): boolean => {
    if (message.includes('MetaMask') || message.includes('ethereum') || message.includes('wallet')) {
      console.warn('Wallet error intercepted:', message);
      return true; // Prevent default error handling
    }
    return false;
  };

  // Handle unhandled rejections
  if (window.addEventListener) {
    window.addEventListener('unhandledrejection', (event: PromiseRejectionEvent) => {
      if (handleError(event.reason?.message)) {
        event.preventDefault();
      }
    });

    // Handle regular errors
    window.addEventListener('error', (event: ErrorEvent) => {
      if (handleError(event.error?.message || event.message)) {
        event.preventDefault();
      }
    });
  }
};

export default {
  isWalletAvailable,
  connectWallet,
  initializeWalletErrorHandler
};