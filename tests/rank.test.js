import { test } from 'node:test';
import assert from 'node:assert/strict';
import { score, rank } from '../src/query/rank.js';

const entry = { path: 'a.md', length: 10, terms: { 배포: 2, 롤백: 1 } };

test('일치한 토큰이 없으면 0점', () => {
  assert.equal(score(entry, ['없는말']), 0);
});

test('등장 횟수를 문서 길이로 나눈다', () => {
  assert.equal(score(entry, ['배포']), 0.2);
});

test('여러 토큰의 점수를 더한다', () => {
  // 부동소수점이라 정확 일치로 비교하지 않는다 — 0.2 + 0.1 은 0.30000000000000004
  assert.ok(Math.abs(score(entry, ['배포', '롤백']) - 0.3) < 1e-9);
});

test('같은 검색 토큰이 여러 번 나오면 점수도 누적한다', () => {
  assert.equal(score(entry, ['배포', '배포']), 0.4);
});

test('점수 내림차순으로 정렬한다', () => {
  const ranked = rank([
    { path: '낮음.md', score: 0.1 },
    { path: '높음.md', score: 0.9 },
  ]);
  assert.deepEqual(ranked.map((result) => result.path), ['높음.md', '낮음.md']);
});

test('점수가 같으면 경로 순으로 정렬한다', () => {
  const ranked = rank([
    { path: 'b.md', score: 1 },
    { path: 'a.md', score: 1 },
  ]);
  assert.deepEqual(ranked.map((r) => r.path), ['a.md', 'b.md']);
});

test('정렬해도 원본 결과 배열은 바꾸지 않는다', () => {
  const results = [
    { path: 'b.md', score: 1 },
    { path: 'a.md', score: 2 },
  ];
  const original = [...results];

  rank(results);

  assert.deepEqual(results, original);
});

test('빈 검색 토큰의 점수는 0점이다', () => {
  assert.equal(score(entry, []), 0);
});

test('빈 결과를 정렬하면 빈 배열이다', () => {
  assert.deepEqual(rank([]), []);
});

test('토큰 정보가 없는 문서는 TypeError를 던진다', () => {
  assert.throws(() => score({ path: 'broken.md', length: 10 }, ['배포']), TypeError);
});
