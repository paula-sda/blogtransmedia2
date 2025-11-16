import { getPostData, getAllPostIds } from '../../../lib/posts';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Markdown from 'markdown-to-jsx';
import { 
  SitiosSection, 
  ComidaSection,
  CarruselSection
 
} from '../../components/CustomMarkdwn2';

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

// Extraer sección "¿Sabías que...?"
let curiosidadesContent = "";

const curiosidadHeading = post.content.indexOf("## ¿Sabías que");

if (curiosidadHeading !== -1) {
  // Buscar el siguiente heading después del "¿Sabías que...?"
  const nextHeadingIndex = post.content.indexOf("## ", curiosidadHeading + 3);

  if (nextHeadingIndex !== -1) {
    // Si hay más secciones después
    curiosidadesContent = post.content.substring(curiosidadHeading, nextHeadingIndex);
  } else {
    // Si fuera la última (no es tu caso, pero lo dejamos por seguridad)
    curiosidadesContent = post.content.substring(curiosidadHeading);
  }
}

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
          <SitiosSection postContent={post.content} />
          <ComidaSection postContent={post.content} />

        </section>
        <section className="curiosidad">
  <Markdown
    options={{
      forceBlock: true,
      wrapper: 'div'
    }}
  >
    {curiosidadesContent}
  </Markdown>
</section>

        <section>
        <CarruselSection postContent={post.content} />
          
        </section>
      </article>

      <Footer />
    </>
  );
}