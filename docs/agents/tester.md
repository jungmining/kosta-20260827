# `tester`

[실행 원본](../../.claude/agents/tester.md)

## 역할과 절차

구현 코드는 수정하지 않고 테스트만 작성·확인한다.

1. 기존 테스트 방식을 읽는다.
2. `node:test`, `assert/strict`, 한국어 테스트 이름을 따른다.
3. 정상·예외·경계값을 각각 다룬다.
4. `npm test`로 확인한다.

## 도구와 쓰기 범위

- 허용 도구: `Read`, `Grep`, `Glob`, `Write`, `Bash`
- `tests/` 아래만 쓴다.
- `src/`는 읽기만 하며 구현이 잘못되어도 수정하지 않고 보고한다.

`pipeline` 명령의 `.pipeline/03-test.md` 산출물 요구는 이 일반 역할 지침과 별도로 존재한다.
