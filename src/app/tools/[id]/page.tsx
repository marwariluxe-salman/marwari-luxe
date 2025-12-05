import { tools } from '@/data/tools';
import ToolPageClient from '@/components/ToolPageClient';

// Function to generate dynamic metadata for tool pages
export async function generateMetadata({ params }: { params: { id: string } }) {
  const tool = tools.find(t => t.id === params.id);
  
  if (!tool) {
    return {
      title: 'Tool Not Found - Marwari Luxe',
      description: 'The tool you are looking for could not be found.',
    };
  }
  
  const baseUrl = 'https://marwariluxe.com';
  const toolUrl = `${baseUrl}/tools/${tool.id}`;
  
  return {
    title: `${tool.title} - ${tool.category} Tool | Marwari Luxe`,
    description: tool.description,
    robots: "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1",
    alternates: {
      canonical: toolUrl
    },
    openGraph: {
      title: tool.title,
      description: tool.description,
      url: toolUrl,
      type: 'website',
      images: [
        {
          url: `/tools-og-image.jpg`,
          width: 1200,
          height: 630,
          alt: `${tool.title} - ${tool.category} Tool`
        }
      ]
    },
    twitter: {
      card: 'summary_large_image',
      title: tool.title,
      description: tool.description,
      images: [`/tools-twitter-card.jpg`]
    }
  };
}

const ToolPage = ({ params }: { params: { id: string } }) => {
  const tool = tools.find(t => t.id === params.id) || null;
  
  return <ToolPageClient tool={tool} />;
};

export default ToolPage;