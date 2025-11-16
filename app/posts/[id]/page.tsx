import { getPostData, getAllPostIds } from '../../../lib/posts';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Markdown from 'markdown-to-jsx';
import { 
  SitiosSection, 
  ComidaSection, 
  CuriosidadSection, 
  CarruselSection 
} from '../../components/CustomMarkdown';

export async function generateStaticParams() {
  const posts = getAllPostIds();
  return posts;
}

export default async function Post({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const { id } = resolvedParams;
  
  const post = await getPostData(id);

  // DEBUG: Ver qué contiene el contenido
  console.log('Contenido completo:', post.content);

  // Extraer solo la introducción (todo hasta el primer "## " después del título)
  const firstHeadingIndex = post.content.indexOf('## ');
  let introContent = post.content;

  if (firstHeadingIndex > 0) {
    // Buscar el siguiente "## " después del primer heading
    const secondHeadingIndex = post.content.indexOf('## ', firstHeadingIndex + 3);
    if (secondHeadingIndex > 0) {
      introContent = post.content.substring(0, secondHeadingIndex);
    }
  }

  console.log('Intro extraída:', introContent);

  return (
    <>
      <Header />
      
      <header className="aboutHeader">
    
        <h1>
          {post.title}
        </h1>
        <p>{post.description}</p>
      </header>

      <article>
        <section className="intro">
          {/* Solo la introducción */}
          <Markdown
            options={{
              forceBlock: true,
              wrapper: 'div'
            }}
          >
            {introContent}
          </Markdown>
           </section>
           <section>
          {/* Componentes especiales */}
          <SitiosSection />
          <ComidaSection />
          <CuriosidadSection />
          <CarruselSection />
        </section>
      </article>

      <Footer />
    </>
  );
}