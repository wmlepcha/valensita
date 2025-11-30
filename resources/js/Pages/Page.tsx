import { Head } from '@inertiajs/react';
import { useMemo } from 'react';
import MainLayout from '@/Layouts/MainLayout';

interface PageProps {
  page: {
    title: string;
    content: string | null;
    metaTitle?: string;
    metaDescription?: string | null;
  };
}

export default function Page({ page }: PageProps) {
  // Parse content into sections based on H3 headings or numbered patterns
  // EXPLICIT RULES:
  // 1. H1 and H2 NEVER create new numbered sections (they don't trigger section boundaries)
  // 2. H1 and H2 CAN be included in numbered sections (they're just content)
  // 3. ONLY H3 creates new numbered sections
  // 4. Numbered sections only start when we encounter the first H3
  const sections = useMemo(() => {
    if (!page.content) return [];

    // Create a temporary div to parse HTML
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = page.content;

    const sections: Array<{ number: number; content: string }> = [];
    let currentSection = '';
    let sectionNumber = 1;
    let nodes = Array.from(tempDiv.childNodes);

    nodes.forEach((node) => {
      if (node.nodeType === Node.ELEMENT_NODE) {
        const element = node as HTMLElement;
        const tagName = element.tagName?.toLowerCase();
        const textContent = element.textContent?.trim() || '';

        // EXPLICIT: H1 and H2 are added to currentSection but NEVER trigger section creation
        if (tagName === 'h1' || tagName === 'h2') {
          currentSection += (node as HTMLElement).outerHTML || '';
          return; // Exit early - H1/H2 never create new sections
        }
        
        // H4 is also excluded from creating sections
        if (tagName === 'h4') {
          currentSection += (node as HTMLElement).outerHTML || '';
          return;
        }
        
        // EXPLICIT: ONLY H3 creates numbered sections
        const isHeading = tagName === 'h3';
        
        // Check if element starts with numbered pattern (1., 2., 3., etc.)
        // Explicitly exclude all heading tags
        const isNumberedSection = (
          !['h1', 'h2', 'h3', 'h4', 'h5', 'h6'].includes(tagName || '') &&
          ['p', 'strong', 'div', 'b'].includes(tagName || '') && 
          /^\d+\.\s+[A-Z]/.test(textContent)
        );

        // EXPLICIT: Create a new numbered section ONLY when:
        // 1. We encounter H3 (the ONLY heading that creates sections)
        // 2. OR we encounter a numbered pattern
        // 3. AND we have existing content to save
        if ((isHeading || isNumberedSection) && currentSection.trim()) {
          sections.push({
            number: sectionNumber++,
            content: currentSection.trim(),
          });
          currentSection = '';
        }
      }

      // Add the node to current section (only if not H1, H2, H4 - already handled above)
      if (node.nodeType === Node.ELEMENT_NODE) {
        const tagName = (node as HTMLElement).tagName?.toLowerCase();
        if (tagName !== 'h1' && tagName !== 'h2' && tagName !== 'h4') {
          currentSection += (node as HTMLElement).outerHTML || '';
        }
      } else {
        currentSection += node.textContent || '';
      }
    });

    // Add the last section if there's remaining content
    if (currentSection.trim()) {
      sections.push({
        number: sectionNumber,
        content: currentSection.trim(),
      });
    }

    return sections;
  }, [page.content]);

  return (
    <MainLayout title={page.metaTitle || page.title}>
      <Head>
        {page.metaDescription && (
          <meta name="description" content={page.metaDescription} />
        )}
      </Head>
      
      <section className="min-h-screen bg-neutral-50">
        <div className="container-wide py-16 md:py-20 lg:py-24">
          <div className="max-w-6xl mx-auto">
            {/* Page Title - Minimalist */}
            <div className="mb-12 md:mb-16">
              <h1 className="font-display font-bold text-xl md:text-2xl lg:text-3xl text-neutral-900 tracking-tight">
                {page.title}
              </h1>
            </div>

            {/* Page Content - Numbered Sections */}
            {page.content ? (
              <div className="space-y-0">
                {sections.map((section, index) => (
                  <div key={index} className="border-t border-neutral-200 first:border-t-0">
                    <div className="grid grid-cols-[80px_1fr] md:grid-cols-[100px_1fr] lg:grid-cols-[120px_1fr] gap-6 md:gap-8 lg:gap-12 py-10 md:py-12 lg:py-16">
                      {/* Section Number */}
                      <div className="flex items-start">
                        <span className="font-display font-bold text-5xl md:text-6xl lg:text-7xl text-neutral-900 leading-none">
                          {String(section.number).padStart(2, '0')}
                        </span>
                      </div>

                      {/* Dense Content Block */}
                      <div className="min-w-0">
                        <div 
                          className="prose prose-sm max-w-none
                            prose-headings:font-display prose-headings:font-bold prose-headings:text-neutral-900 prose-headings:tracking-tight
                            prose-h1:text-3xl prose-h1:md:text-4xl prose-h1:lg:text-5xl prose-h1:mb-3 prose-h1:mt-0 prose-h1:first:mt-0 prose-h1:leading-tight
                            prose-h2:text-xl prose-h2:md:text-2xl prose-h2:lg:text-3xl prose-h2:mb-2 prose-h2:mt-0 prose-h2:first:mt-0 prose-h2:leading-tight
                            prose-h3:text-lg prose-h3:md:text-xl prose-h3:lg:text-2xl prose-h3:mb-2 prose-h3:mt-0 prose-h3:first:mt-0 prose-h3:leading-tight
                            prose-h4:text-base prose-h4:md:text-lg prose-h4:lg:text-xl prose-h4:mb-1.5 prose-h4:mt-0 prose-h4:first:mt-0 prose-h4:leading-tight
                            prose-p:text-neutral-600 prose-p:text-xs prose-p:md:text-sm prose-p:leading-[1.6] prose-p:mb-4 prose-p:font-normal
                            prose-a:text-neutral-900 prose-a:font-medium prose-a:underline hover:prose-a:text-neutral-600 prose-a:transition-colors prose-a:text-xs prose-a:md:text-sm
                            prose-strong:text-neutral-900 prose-strong:font-bold
                            prose-ul:text-neutral-900 prose-ul:text-xs prose-ul:md:text-sm prose-ul:my-4 prose-ul:pl-6 prose-ul:list-none
                            prose-ol:text-neutral-900 prose-ol:text-xs prose-ol:md:text-sm prose-ol:my-4 prose-ol:pl-6 prose-ol:list-none
                            prose-li:leading-[1.6] prose-li:mb-2 prose-li:text-xs prose-li:md:text-sm prose-li:text-neutral-900 prose-li:pl-2
                            prose-blockquote:border-l-2 prose-blockquote:border-neutral-900 prose-blockquote:pl-4 prose-blockquote:italic prose-blockquote:my-4 prose-blockquote:text-neutral-900 prose-blockquote:font-medium prose-blockquote:text-sm
                            prose-code:text-neutral-900 prose-code:bg-neutral-100 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-xs prose-code:font-mono
                            prose-pre:bg-neutral-900 prose-pre:text-neutral-50 prose-pre:my-4 prose-pre:p-4 prose-pre:rounded prose-pre:overflow-x-auto prose-pre:text-xs
                            prose-hr:my-6 prose-hr:border-neutral-200 prose-hr:border-t
                            prose-img:my-6 prose-img:rounded-lg"
                          dangerouslySetInnerHTML={{ __html: section.content }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-neutral-400 text-sm">Content coming soon...</p>
              </div>
            )}
          </div>
        </div>
      </section>
    </MainLayout>
  );
}

