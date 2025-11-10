import { remark } from 'remark';
import html from 'remark-html';
import matter from 'gray-matter';
import fs from 'fs';
import path from 'path';

const postsDirectory = path.join(process.cwd(), 'posts');

export function getPostData(slug) {
  console.log('=== MARKDOWN DEBUG START ===');
  console.log('Slug recibido:', slug);
  console.log('Directorio posts:', postsDirectory);
  
  try {
    if (!slug || typeof slug !== 'string') {
      console.error('❌ Slug inválido');
      return null;
    }

    const fullPath = path.join(postsDirectory, `${slug}.md`);
    console.log('📁 Ruta completa:', fullPath);
    
    // Verificar si el directorio existe
    if (!fs.existsSync(postsDirectory)) {
      console.error('❌ Directorio posts no existe:', postsDirectory);
      return null;
    }

    // Verificar si el archivo existe
    if (!fs.existsSync(fullPath)) {
      console.error('❌ Archivo no existe:', fullPath);
      
      // Listar archivos en el directorio para debug
      const files = fs.readdirSync(postsDirectory);
      console.log('📂 Archivos en posts/:', files);
      return null;
    }

    const fileContents = fs.readFileSync(fullPath, 'utf8');
    console.log('✅ Archivo leído, tamaño:', fileContents.length, 'caracteres');
    
    if (!fileContents.trim()) {
      console.error('❌ Archivo vacío');
      return null;
    }

    console.log('📄 Contenido del archivo (primeros 200 chars):', fileContents.substring(0, 200));
    
    const matterResult = matter(fileContents);
    console.log('📋 Frontmatter:', matterResult.data);

    let contentHtml = '';
    if (matterResult.content && matterResult.content.trim()) {
      const processedContent = remark()
        .use(html)
        .processSync(matterResult.content.trim());
      contentHtml = processedContent.toString();
      console.log('✅ Markdown procesado correctamente');
    } else {
      console.warn('⚠️ Contenido markdown vacío');
    }

    const result = {
      slug,
      contentHtml,
      ...matterResult.data,
    };
    
    console.log('✅ Resultado final:', result);
    console.log('=== MARKDOWN DEBUG END ===');
    
    return result;
  } catch (error) {
    console.error('❌ Error crítico en getPostData:', error.message);
    console.error('Stack trace:', error.stack);
    return null;
  }
}