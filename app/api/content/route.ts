import { NextResponse } from 'next/server';
import { readFile, writeFile, mkdir } from 'fs/promises';
import { existsSync } from 'fs';
import path from 'path';

const CONTENT_PATH = path.join(process.cwd(), 'content/site-content.json');

async function ensureContentFile() {
  if (!existsSync(path.join(process.cwd(), 'content'))) {
    await mkdir(path.join(process.cwd(), 'content'), { recursive: true });
  }
  if (!existsSync(CONTENT_PATH)) {
    const defaultContent = JSON.stringify({}, null, 2);
    await writeFile(CONTENT_PATH, defaultContent, 'utf-8');
  }
}

export async function GET() {
  try {
    await ensureContentFile();
    const raw = await readFile(CONTENT_PATH, 'utf-8');
    const content = JSON.parse(raw);
    return NextResponse.json(content);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to read content' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    await ensureContentFile();
    const content = await request.json();
    await writeFile(CONTENT_PATH, JSON.stringify(content, null, 2), 'utf-8');
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to write content' }, { status: 500 });
  }
}