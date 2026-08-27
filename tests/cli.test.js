import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, mkdir, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import { buildIndex } from '../src/indexer/build.js';

const runFile = promisify(execFile);
const cliPath = fileURLToPath(new URL('../src/cli.js', import.meta.url));

async function createIndexedDocuments() {
  const root = await mkdtemp(join(tmpdir(), 'doc-search-cli-'));
  await mkdir(join(root, 'docs'));
  await writeFile(join(root, 'docs', 'a.md'), '배포 배포', 'utf8');
  await writeFile(join(root, 'docs', 'b.md'), '배포', 'utf8');
  await writeFile(join(root, 'docs', 'c.md'), '배포 배포 배포', 'utf8');
  await buildIndex(join(root, 'docs'));
  return join(root, 'docs');
}

test('find --limit 만큼의 결과만 출력한다', async () => {
  const root = await createIndexedDocuments();
  const { stdout } = await runFile(process.execPath, [
    cliPath,
    'find',
    '배포',
    root,
    '--limit',
    '1',
  ]);

  assert.equal(stdout.trim().split('\n').length, 1);
});
