'use client';

import { useState, useEffect, useRef } from 'react';
import { Save, Plus, Trash2, ChevronDown, ChevronRight, Upload, Bold, Italic, Underline, List, ListOrdered, Heading2, Quote } from 'lucide-react';

interface SiteContent {
  [key: string]: any;
}

export default function AdminPage() {
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState(false);
  const [content, setContent] = useState<SiteContent>({});
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({});
  const [uploadingImage, setUploadingImage] = useState<string | null>(null);

  useEffect(() => {
    if (sessionStorage.getItem('admin_auth') === '1') {
      setAuthenticated(true);
    }
  }, []);

  useEffect(() => {
    if (!authenticated) return;
    fetch('/api/content')
      .then((res) => res.json())
      .then(setContent)
      .catch(() => {});
  }, [authenticated]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'vaibhav2026') {
      sessionStorage.setItem('admin_auth', '1');
      setAuthenticated(true);
    } else {
      setPasswordError(true);
      setPassword('');
    }
  };

  if (!authenticated) {
    return (
      <section className='mx-auto max-w-sm px-5 pt-24'>
        <h1 className='text-display text-3xl font-extrabold text-center'>Admin</h1>
        <form onSubmit={handleLogin} className='mt-8 space-y-4'>
          <div>
            <label className='text-xs font-bold uppercase tracking-widest text-muted-foreground'>Password</label>
            <input
              type='password'
              value={password}
              onChange={(e) => { setPassword(e.target.value); setPasswordError(false); }}
              className='mt-2 w-full rounded-2xl border-2 border-border bg-background px-4 py-3 focus:border-foreground focus:outline-none transition'
              placeholder='Enter password'
              autoFocus
            />
            {passwordError && <p className='mt-1 text-sm text-red-500'>Incorrect password</p>}
          </div>
          <button
            type='submit'
            className='w-full rounded-full bg-foreground text-background px-6 py-3 font-semibold hover:opacity-90'
          >
            Enter
          </button>
        </form>
      </section>
    );
  }

  const updateField = (path: (string | number)[], value: any) => {
    setContent((prev) => {
      const next = JSON.parse(JSON.stringify(prev));
      let obj = next;
      for (let i = 0; i < path.length - 1; i++) {
        obj = obj[path[i]];
      }
      obj[path[path.length - 1]] = value;
      return next;
    });
  };

  const addToArray = (path: (string | number)[], item: any) => {
    setContent((prev) => {
      const next = JSON.parse(JSON.stringify(prev));
      let obj = next;
      for (const key of path) obj = obj[key];
      obj.push(item);
      return next;
    });
  };

  const removeFromArray = (path: (string | number)[], index: number) => {
    setContent((prev) => {
      const next = JSON.parse(JSON.stringify(prev));
      let obj = next;
      for (const key of path) obj = obj[key];
      obj.splice(index, 1);
      return next;
    });
  };

  const save = async () => {
    setSaving(true);
    await fetch('/api/content', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(content),
    });
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const toggle = (section: string) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const uploadProjectImage = async (projectIndex: number, file: File | null) => {
    if (!file) return;

    setUploadingImage(`project-${projectIndex}`);
    const formData = new FormData();
    formData.append('image', file);

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Upload failed');
      }

      updateField(['projects', projectIndex, 'image'], data.url);
    } catch (error) {
      alert(error instanceof Error ? error.message : 'Upload failed');
    } finally {
      setUploadingImage(null);
    }
  };

  if (!content.hero) return <div className='p-10 text-lg'>Loading...</div>;

  return (
    <div className='min-h-screen bg-background'>
      <div className='sticky top-0 z-50 bg-card border-b-2 border-foreground px-6 py-4 flex items-center justify-between'>
        <h1 className='text-display text-2xl font-extrabold'>Admin — Edit Content</h1>
        <div className='flex items-center gap-3'>
          {saved && <span className='text-sm text-green-600 font-semibold'>Saved!</span>}
          <a href='/' className='text-sm text-muted-foreground hover:text-foreground'>← Back to site</a>
          <button
            onClick={() => { sessionStorage.removeItem('admin_auth'); setAuthenticated(false); }}
            className='text-sm text-muted-foreground hover:text-foreground'
          >
            Logout
          </button>
          <button
            onClick={save}
            disabled={saving}
            className='inline-flex items-center gap-2 rounded-full bg-foreground text-background px-5 py-2.5 font-semibold hover:opacity-90 disabled:opacity-60'
          >
            <Save size={16} /> {saving ? 'Saving...' : 'Save all'}
          </button>
        </div>
      </div>

      <div className='max-w-4xl mx-auto px-6 py-10 space-y-6'>

        <Section title='Hero' isOpen={openSections.hero} onToggle={() => toggle('hero')}>
          <Field label='Sticker text' value={content.hero.sticker} onChange={(v) => updateField(['hero', 'sticker'], v)} />
          <Field label='Line 1' value={content.hero.heading.line1} onChange={(v) => updateField(['hero', 'heading', 'line1'], v)} />
          <Field label='Line 2 (gradient)' value={content.hero.heading.line2gradient} onChange={(v) => updateField(['hero', 'heading', 'line2gradient'], v)} />
          <Field label='Line 3' value={content.hero.heading.line3} onChange={(v) => updateField(['hero', 'heading', 'line3'], v)} />
          <Field label='Line 3 italic' value={content.hero.heading.line3italic} onChange={(v) => updateField(['hero', 'heading', 'line3italic'], v)} />
          <TextArea label='Description (HTML ok)' value={content.hero.description} onChange={(v) => updateField(['hero', 'description'], v)} rows={3} />
        </Section>

        <Section title='Stats' isOpen={openSections.stats} onToggle={() => toggle('stats')}>
          <Field label='Currently text' value={content.stats.currently} onChange={(v) => updateField(['stats', 'currently'], v)} />
          <Field label='Stat 1 value' value={content.stats.stat1.value} onChange={(v) => updateField(['stats', 'stat1', 'value'], v)} />
          <Field label='Stat 1 label' value={content.stats.stat1.label} onChange={(v) => updateField(['stats', 'stat1', 'label'], v)} />
          <Field label='Stat 2 value' value={content.stats.stat2.value} onChange={(v) => updateField(['stats', 'stat2', 'value'], v)} />
          <Field label='Stat 2 label' value={content.stats.stat2.label} onChange={(v) => updateField(['stats', 'stat2', 'label'], v)} />
          <Field label='Stat 3 value' value={content.stats.stat3.value} onChange={(v) => updateField(['stats', 'stat3', 'value'], v)} />
          <Field label='Stat 3 label' value={content.stats.stat3.label} onChange={(v) => updateField(['stats', 'stat3', 'label'], v)} />
          <Field label='Stat 4 value' value={content.stats.stat4.value} onChange={(v) => updateField(['stats', 'stat4', 'value'], v)} />
          <Field label='Stat 4 label' value={content.stats.stat4.label} onChange={(v) => updateField(['stats', 'stat4', 'label'], v)} />
          <Field label='Stat 5' value={content.stats.stat5} onChange={(v) => updateField(['stats', 'stat5'], v)} />
        </Section>

        <Section title='Projects' isOpen={openSections.projects} onToggle={() => toggle('projects')}>
          {content.projects.map((p: any, i: number) => (
            <div key={i} className='rounded-2xl border-2 border-border p-4 mb-4 space-y-3'>
              <div className='flex items-center justify-between'>
                <span className='font-bold'>Project {i + 1}: {p.title}</span>
                <button onClick={() => removeFromArray(['projects'], i)} className='text-red-500 hover:text-red-700'><Trash2 size={14} /></button>
              </div>
              <Field label='Emoji' value={p.emoji} onChange={(v) => updateField(['projects', i, 'emoji'], v)} />
              <div className='space-y-2'>
                <Field
                  label='Image URL (optional)'
                  value={p.image || ''}
                  onChange={(v) => updateField(['projects', i, 'image'], v)}
                  type='url'
                  placeholder='https://example.com/image.jpg'
                />
                <label className='flex items-center gap-2 text-sm font-medium text-muted-foreground cursor-pointer'>
                  <Upload size={14} />
                  <span>{uploadingImage === `project-${i}` ? 'Uploading...' : 'Upload image from computer'}</span>
                  <input
                    type='file'
                    accept='image/*'
                    className='hidden'
                    onChange={(e) => uploadProjectImage(i, e.target.files?.[0] || null)}
                  />
                </label>
              </div>
              <Field label='Title' value={p.title} onChange={(v) => updateField(['projects', i, 'title'], v)} />
              <Field label='Slug' value={p.slug} onChange={(v) => updateField(['projects', i, 'slug'], v)} />
              <RichTextEditor label='Description' value={p.description || ''} onChange={(v) => updateField(['projects', i, 'description'], v)} />
              <Field label='Category' value={p.category} onChange={(v) => updateField(['projects', i, 'category'], v)} />
              <Field label='Live URL (leave empty if not live)' value={p.liveUrl || ''} onChange={(v) => updateField(['projects', i, 'liveUrl'], v)} />
              <Field label='Tags (comma-separated)' value={p.tags.join(', ')} onChange={(v) => updateField(['projects', i, 'tags'], v.split(',').map((s: string) => s.trim()))} />
              <Field label='Gradient' value={p.gradient} onChange={(v) => updateField(['projects', i, 'gradient'], v)} />
              <RichTextEditor label='Problem' value={p.problem || ''} onChange={(v) => updateField(['projects', i, 'problem'], v)} />
              <RichTextEditor label='Key Decisions' value={p.keyDecisions || ''} onChange={(v) => updateField(['projects', i, 'keyDecisions'], v)} />
              <RichTextEditor label='Outcome' value={p.outcome || ''} onChange={(v) => updateField(['projects', i, 'outcome'], v)} />
            </div>
          ))}
          <button
            onClick={() => addToArray(['projects'], { slug: 'new-project', emoji: '🚀', image: '', title: 'New Project', description: '', tags: [], gradient: 'from-violet to-hotpink', dotColor: 'bg-violet', category: 'AI Tools', liveUrl: '', problem: '', keyDecisions: '', outcome: '' })}
            className='inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground hover:text-foreground'
          >
            <Plus size={14} /> Add project
          </button>
        </Section>

        <Section title='Tools' isOpen={openSections.tools} onToggle={() => toggle('tools')}>
          {content.tools.map((t: any, i: number) => (
            <div key={i} className='flex items-center gap-3 mb-2'>
              <Field label='Name' value={t.name} onChange={(v) => updateField(['tools', i, 'name'], v)} />
              <Field label='Description' value={t.description} onChange={(v) => updateField(['tools', i, 'description'], v)} />
              <Field label='Icon (SVG)' value={t.icon || ''} onChange={(v) => updateField(['tools', i, 'icon'], v)} />
              <button onClick={() => removeFromArray(['tools'], i)} className='text-red-500 hover:text-red-700 mt-5'><Trash2 size={14} /></button>
            </div>
          ))}
          <button
            onClick={() => addToArray(['tools'], { name: '', description: '', icon: '' })}
            className='inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground hover:text-foreground'
          >
            <Plus size={14} /> Add tool
          </button>
        </Section>

        <Section title='CTA Banner' isOpen={openSections.cta} onToggle={() => toggle('cta')}>
          <Field label='Heading' value={content.cta.heading} onChange={(v) => updateField(['cta', 'heading'], v)} />
          <TextArea label='Description' value={content.cta.description} onChange={(v) => updateField(['cta', 'description'], v)} rows={2} />
          <Field label='Button label' value={content.cta.buttonLabel} onChange={(v) => updateField(['cta', 'buttonLabel'], v)} />
        </Section>

        <Section title='About — Heading' isOpen={openSections.aboutHeading} onToggle={() => toggle('aboutHeading')}>
          <Field label='Line 1' value={content.about.heading.line1} onChange={(v) => updateField(['about', 'heading', 'line1'], v)} />
          <Field label='Line 2 (gradient)' value={content.about.heading.line2gradient} onChange={(v) => updateField(['about', 'heading', 'line2gradient'], v)} />
          <Field label='Line 3 italic' value={content.about.heading.line3italic} onChange={(v) => updateField(['about', 'heading', 'line3italic'], v)} />
        </Section>

        <Section title='About — Bio' isOpen={openSections.aboutBio} onToggle={() => toggle('aboutBio')}>
          {content.about.bio.map((p: string, i: number) => (
            <div key={i} className='mb-3'>
              <div className='flex items-center justify-between'>
                <label className='text-xs font-bold uppercase tracking-widest text-muted-foreground'>Paragraph {i + 1}</label>
                <button onClick={() => removeFromArray(['about', 'bio'], i)} className='text-red-500 hover:text-red-700'><Trash2 size={12} /></button>
              </div>
              <TextArea label='' value={p} onChange={(v) => updateField(['about', 'bio', i], v)} rows={3} />
            </div>
          ))}
          <button
            onClick={() => addToArray(['about', 'bio'], '')}
            className='inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground hover:text-foreground'
          >
            <Plus size={14} /> Add paragraph
          </button>
        </Section>

        <Section title='About — Timeline' isOpen={openSections.aboutTimeline} onToggle={() => toggle('aboutTimeline')}>
          {content.about.timeline.map((t: any, i: number) => (
            <div key={i} className='rounded-2xl border-2 border-border p-4 mb-3 space-y-2'>
              <div className='flex items-center justify-between'>
                <span className='font-bold'>{t.year}</span>
                <button onClick={() => removeFromArray(['about', 'timeline'], i)} className='text-red-500 hover:text-red-700'><Trash2 size={14} /></button>
              </div>
              <Field label='Year' value={t.year} onChange={(v) => updateField(['about', 'timeline', i, 'year'], v)} />
              <Field label='Title' value={t.title} onChange={(v) => updateField(['about', 'timeline', i, 'title'], v)} />
              <TextArea label='Description' value={t.description} onChange={(v) => updateField(['about', 'timeline', i, 'description'], v)} rows={2} />
              <Field label='Color class (e.g. bg-violet)' value={t.colorClass} onChange={(v) => updateField(['about', 'timeline', i, 'colorClass'], v)} />
              <Field label='Dot class (e.g. bg-violet)' value={t.dotClass} onChange={(v) => updateField(['about', 'timeline', i, 'dotClass'], v)} />
            </div>
          ))}
          <button
            onClick={() => addToArray(['about', 'timeline'], { year: '', title: '', description: '', colorClass: 'bg-violet', dotClass: 'bg-violet' })}
            className='inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground hover:text-foreground'
          >
            <Plus size={14} /> Add timeline entry
          </button>
        </Section>

        <Section title='About — Toolbelt' isOpen={openSections.aboutToolbelt} onToggle={() => toggle('aboutToolbelt')}>
          <Field label='Engineering (comma-separated)' value={content.about.toolbelt.engineering.join(', ')} onChange={(v) => updateField(['about', 'toolbelt', 'engineering'], v.split(',').map((s: string) => s.trim()))} />
          <Field label='AI & Automation (comma-separated)' value={content.about.toolbelt.ai.join(', ')} onChange={(v) => updateField(['about', 'toolbelt', 'ai'], v.split(',').map((s: string) => s.trim()))} />
          <Field label='Product & Craft (comma-separated)' value={content.about.toolbelt.product.join(', ')} onChange={(v) => updateField(['about', 'toolbelt', 'product'], v.split(',').map((s: string) => s.trim()))} />
        </Section>

        <Section title='About — Certifications' isOpen={openSections.aboutCerts} onToggle={() => toggle('aboutCerts')}>
          {content.about.certifications.map((c: string, i: number) => (
            <div key={i} className='flex items-center gap-2 mb-2'>
              <Field label='' value={c} onChange={(v) => updateField(['about', 'certifications', i], v)} />
              <button onClick={() => removeFromArray(['about', 'certifications'], i)} className='text-red-500 hover:text-red-700 mt-5'><Trash2 size={14} /></button>
            </div>
          ))}
          <button
            onClick={() => addToArray(['about', 'certifications'], '')}
            className='inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground hover:text-foreground'
          >
            <Plus size={14} /> Add certification
          </button>
        </Section>

        <Section title='Resume' isOpen={openSections.resume} onToggle={() => toggle('resume')}>
          <Field label='Name' value={content.resume.name} onChange={(v) => updateField(['resume', 'name'], v)} />
          <Field label='Subtitle' value={content.resume.subtitle} onChange={(v) => updateField(['resume', 'subtitle'], v)} />
          <Field label='Contact' value={content.resume.contact} onChange={(v) => updateField(['resume', 'contact'], v)} />
          <TextArea label='Summary' value={content.resume.summary} onChange={(v) => updateField(['resume', 'summary'], v)} rows={3} />

          <p className='text-xs font-bold uppercase tracking-widest text-muted-foreground mt-6 mb-2'>Experience</p>
          {content.resume.experience.map((exp: any, i: number) => (
            <div key={i} className='rounded-2xl border-2 border-border p-4 mb-3 space-y-2'>
              <div className='flex items-center justify-between'>
                <span className='font-bold'>{exp.role}</span>
                <button onClick={() => removeFromArray(['resume', 'experience'], i)} className='text-red-500 hover:text-red-700'><Trash2 size={14} /></button>
              </div>
              <Field label='Role' value={exp.role} onChange={(v) => updateField(['resume', 'experience', i, 'role'], v)} />
              <Field label='Company' value={exp.company} onChange={(v) => updateField(['resume', 'experience', i, 'company'], v)} />
              <Field label='Period' value={exp.period} onChange={(v) => updateField(['resume', 'experience', i, 'period'], v)} />
              <Field label='Bullets (one per line)' value={exp.bullets.join('\n')} onChange={(v) => updateField(['resume', 'experience', i, 'bullets'], v.split('\n').filter((s: string) => s.trim()))} />
            </div>
          ))}
          <button
            onClick={() => addToArray(['resume', 'experience'], { role: '', company: '', period: '', bullets: [] })}
            className='inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground hover:text-foreground'
          >
            <Plus size={14} /> Add experience
          </button>

          <p className='text-xs font-bold uppercase tracking-widest text-muted-foreground mt-6 mb-2'>Skills</p>
          <Field label='Engineering' value={content.resume.skills.engineering} onChange={(v) => updateField(['resume', 'skills', 'engineering'], v)} />
          <Field label='AI & Automation' value={content.resume.skills.ai} onChange={(v) => updateField(['resume', 'skills', 'ai'], v)} />
          <Field label='Product' value={content.resume.skills.product} onChange={(v) => updateField(['resume', 'skills', 'product'], v)} />
        </Section>

        <Section title='Contact' isOpen={openSections.contact} onToggle={() => toggle('contact')}>
          <Field label='Line 1' value={content.contact.heading.line1} onChange={(v) => updateField(['contact', 'heading', 'line1'], v)} />
          <Field label='Line 2 (gradient)' value={content.contact.heading.line2gradient} onChange={(v) => updateField(['contact', 'heading', 'line2gradient'], v)} />
          <TextArea label='Description' value={content.contact.description} onChange={(v) => updateField(['contact', 'description'], v)} rows={2} />

          <p className='text-xs font-bold uppercase tracking-widest text-muted-foreground mt-6 mb-2'>Cards</p>
          {['email', 'linkedin', 'github', 'phone'].map((key) => (
            <div key={key} className='rounded-2xl border-2 border-border p-4 mb-3 space-y-2'>
              <span className='font-bold capitalize'>{key}</span>
              <Field label='Label' value={content.contact.cards[key].label} onChange={(v) => updateField(['contact', 'cards', key, 'label'], v)} />
              <Field label='Value' value={content.contact.cards[key].value} onChange={(v) => updateField(['contact', 'cards', key, 'value'], v)} />
              <Field label='Href' value={content.contact.cards[key].href} onChange={(v) => updateField(['contact', 'cards', key, 'href'], v)} />
              <Field label='Color class' value={content.contact.cards[key].color} onChange={(v) => updateField(['contact', 'cards', key, 'color'], v)} />
            </div>
          ))}
        </Section>

        <Section title='Footer' isOpen={openSections.footer} onToggle={() => toggle('footer')}>
          <Field label='Heading' value={content.footer.heading} onChange={(v) => updateField(['footer', 'heading'], v)} />
          <Field label='Heading (gradient)' value={content.footer.headingGradient} onChange={(v) => updateField(['footer', 'headingGradient'], v)} />
          <Field label='Copyright' value={content.footer.copyright} onChange={(v) => updateField(['footer', 'copyright'], v)} />
          <Field label='Tagline' value={content.footer.tagline} onChange={(v) => updateField(['footer', 'tagline'], v)} />
        </Section>

        <Section title='Navigation' isOpen={openSections.nav} onToggle={() => toggle('nav')}>
          {content.navLinks.map((link: any, i: number) => (
            <div key={i} className='flex items-center gap-3 mb-2'>
              <Field label='Label' value={link.label} onChange={(v) => updateField(['navLinks', i, 'label'], v)} />
              <Field label='Href' value={link.href} onChange={(v) => updateField(['navLinks', i, 'href'], v)} />
              <button onClick={() => removeFromArray(['navLinks'], i)} className='text-red-500 hover:text-red-700 mt-5'><Trash2 size={14} /></button>
            </div>
          ))}
          <button
            onClick={() => addToArray(['navLinks'], { href: '/', label: 'New' })}
            className='inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground hover:text-foreground'
          >
            <Plus size={14} /> Add nav link
          </button>
        </Section>
      </div>

      <div className='sticky bottom-0 bg-card border-t-2 border-foreground px-6 py-4 flex justify-end'>
        <button
          onClick={save}
          disabled={saving}
          className='inline-flex items-center gap-2 rounded-full bg-foreground text-background px-6 py-3 font-semibold hover:opacity-90 disabled:opacity-60'
        >
          <Save size={16} /> {saving ? 'Saving...' : 'Save all changes'}
        </button>
      </div>
    </div>
  );
}

function RichTextEditor({ label, value, onChange, placeholder = '' }: { label: string; value: string; onChange: (v: string) => void; placeholder?: string }) {
  const editorRef = useRef<HTMLDivElement>(null);
  const savedRange = useRef<Range | null>(null);

  useEffect(() => {
    if (editorRef.current && document.activeElement !== editorRef.current && editorRef.current.innerHTML !== (value || '')) {
      editorRef.current.innerHTML = value || '';
    }
  }, [value]);

  const saveSelection = () => {
    const selection = window.getSelection();
    if (selection && selection.rangeCount > 0) {
      savedRange.current = selection.getRangeAt(0).cloneRange();
    }
  };

  const restoreSelection = () => {
    if (savedRange.current) {
      const selection = window.getSelection();
      if (selection) {
        selection.removeAllRanges();
        selection.addRange(savedRange.current);
      }
    }
  };

  const replaceBlockWith = (node: Node) => {
    const selection = window.getSelection();
    if (!selection || selection.rangeCount === 0) return;

    const range = selection.getRangeAt(0);
    const BLOCK = 'P|DIV|H[1-6]|BLOCKQUOTE|LI';

    const startContainer = range.startContainer;
    const startOffset = range.startOffset;
    const endContainer = range.endContainer;
    const endOffset = range.endOffset;

    const findBlockAncestor = (n: Node): HTMLElement | null => {
      let el = n.nodeType === Node.TEXT_NODE ? n.parentElement : (n as HTMLElement);
      while (el && el !== editorRef.current) {
        if (el.tagName && el.tagName.match(BLOCK)) return el;
        el = el.parentElement;
      }
      return null;
    };

    const startBlock = findBlockAncestor(startContainer);
    const endBlock = findBlockAncestor(endContainer);

    if (!startBlock || !endBlock) {
      range.deleteContents();
      range.insertNode(node);
      return;
    }

    const parent = startBlock.parentElement!;
    const nextSibling = endBlock.nextSibling;

    parent.insertBefore(node, startBlock);

    let current: Node | null = startBlock;
    while (current && current !== nextSibling) {
      const nxt: Node | null = current.nextSibling;
      if (current !== node) parent.removeChild(current);
      current = nxt;
    }
  };

  const applyCommand = (command: string, valueArg?: string) => {
    const editor = editorRef.current;
    if (!editor) return;

    const selection = window.getSelection();
    if (!selection) return;

    const listCommands = ['insertUnorderedList', 'insertOrderedList'];
    if (listCommands.includes(command)) {
      const listTag = command === 'insertUnorderedList' ? 'ul' : 'ol';

      restoreSelection();

      if (!selection.rangeCount || selection.isCollapsed) {
        const list = document.createElement(listTag);
        const item = document.createElement('li');
        item.textContent = 'List item';
        list.appendChild(item);

        editor.focus();

        const sel = window.getSelection();
        if (sel && sel.rangeCount > 0) {
          const range = sel.getRangeAt(0);
          replaceBlockWith(list);
        } else {
          editor.appendChild(list);
        }

        const newRange = document.createRange();
        newRange.selectNodeContents(item);
        newRange.collapse(false);
        const sel2 = window.getSelection();
        sel2?.removeAllRanges();
        sel2?.addRange(newRange);

        onChange(editor.innerHTML);
        return;
      }

      const selectedText = selection.toString();
      const lines = selectedText.split(/\r?\n/).map((l) => l.trim()).filter(Boolean);

      editor.focus();
      restoreSelection();

      const list = document.createElement(listTag);
      lines.forEach((line) => {
        const item = document.createElement('li');
        item.textContent = line;
        list.appendChild(item);
      });

      replaceBlockWith(list);

      const newRange = document.createRange();
      newRange.selectNodeContents(list.querySelector('li') || list);
      newRange.collapse(false);
      const sel = window.getSelection();
      sel?.removeAllRanges();
      sel?.addRange(newRange);

      onChange(editor.innerHTML);
      return;
    }

    editor.focus();
    restoreSelection();
    document.execCommand(command, false, valueArg);
    onChange(editor.innerHTML);
  };

  const handleMouseDown = () => {
    saveSelection();
  };

  const handleInput = () => {
    onChange(editorRef.current?.innerHTML || '');
  };

  return (
    <div>
      {label && <label className='text-xs font-bold uppercase tracking-widest text-muted-foreground'>{label}</label>}
      <div className='mt-1 rounded-xl border-2 border-border bg-background p-2'>
        <div className='mb-2 flex flex-wrap gap-2'>
          <ToolbarButton icon={<Bold size={14} />} title='Bold' onMouseDown={handleMouseDown} onClick={() => applyCommand('bold')} />
          <ToolbarButton icon={<Italic size={14} />} title='Italic' onMouseDown={handleMouseDown} onClick={() => applyCommand('italic')} />
          <ToolbarButton icon={<Underline size={14} />} title='Underline' onMouseDown={handleMouseDown} onClick={() => applyCommand('underline')} />
          <ToolbarButton icon={<Heading2 size={14} />} title='Heading' onMouseDown={handleMouseDown} onClick={() => applyCommand('formatBlock', 'h3')} />
          <ToolbarButton icon={<List size={14} />} title='Bullet list' onMouseDown={handleMouseDown} onClick={() => applyCommand('insertUnorderedList')} />
          <ToolbarButton icon={<ListOrdered size={14} />} title='Numbered list' onMouseDown={handleMouseDown} onClick={() => applyCommand('insertOrderedList')} />
          <ToolbarButton icon={<Quote size={14} />} title='Quote' onMouseDown={handleMouseDown} onClick={() => applyCommand('formatBlock', 'blockquote')} />
        </div>
        <div
          ref={editorRef}
          contentEditable
          suppressContentEditableWarning
          onInput={handleInput}
          data-placeholder={placeholder}
          className='min-h-[120px] w-full rounded-lg border border-border bg-background px-4 py-3 text-sm text-foreground focus:outline-none'
          style={{ whiteSpace: 'pre-wrap' }}
        />
        <p className='mt-2 text-[11px] uppercase tracking-widest text-muted-foreground'>Rich text formatting will appear on the live project page.</p>
      </div>
    </div>
  );
}

function ToolbarButton({ icon, title, onMouseDown, onClick }: { icon: React.ReactNode; title: string; onMouseDown?: () => void; onClick: () => void }) {
  return (
    <button
      type='button'
      onMouseDown={(e) => {
        e.preventDefault();
        onMouseDown?.();
      }}
      onClick={onClick}
      className='rounded-lg border border-border bg-card px-2.5 py-2 text-muted-foreground hover:border-foreground hover:text-foreground transition'
      title={title}
    >
      {icon}
    </button>
  );
}

function Section({ title, isOpen, onToggle, children }: { title: string; isOpen?: boolean; onToggle: () => void; children: React.ReactNode }) {
  return (
    <div className='rounded-3xl border-2 border-foreground bg-card overflow-hidden'>
      <button
        onClick={onToggle}
        className='w-full flex items-center justify-between px-6 py-4 text-left hover:bg-muted/50 transition'
      >
        <span className='text-display text-lg font-bold'>{title}</span>
        {isOpen ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
      </button>
      {isOpen && <div className='px-6 pb-6 space-y-4 border-t border-border pt-4'>{children}</div>}
    </div>
  );
}

function Field({ label, value, onChange, type = 'text', placeholder = '' }: { label: string; value: string; onChange: (v: string) => void; type?: string; placeholder?: string }) {
  return (
    <div>
      {label && <label className='text-xs font-bold uppercase tracking-widest text-muted-foreground'>{label}</label>}
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className='mt-1 w-full rounded-xl border-2 border-border bg-background px-4 py-2.5 focus:border-foreground focus:outline-none transition text-sm'
      />
    </div>
  );
}

function TextArea({ label, value, onChange, rows = 3 }: { label: string; value: string; onChange: (v: string) => void; rows?: number }) {
  return (
    <div>
      {label && <label className='text-xs font-bold uppercase tracking-widest text-muted-foreground'>{label}</label>}
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={rows}
        className='mt-1 w-full rounded-xl border-2 border-border bg-background px-4 py-2.5 focus:border-foreground focus:outline-none transition text-sm'
      />
    </div>
  );
}