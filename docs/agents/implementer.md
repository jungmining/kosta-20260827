# `implementer`

[실행 원본](../../.claude/agents/implementer.md)

## 역할과 절차

기존 패턴을 따라 기능을 구현한다.

1. 먼저 `CLAUDE.md`를 읽는다.
2. 고칠 파일 주변의 기존 코드를 읽는다.
3. 새 의존성을 추가하지 않고 구현한다.
4. `npm test`로 기존 테스트가 깨지지 않았는지 확인한다.

기존 테스트가 깨지면 테스트를 고치지 않고 깨진 사실을 보고한다.

## 도구와 격리

- 허용 도구: `Read`, `Grep`, `Glob`, `Edit`, `Write`, `Bash`
- 원본 frontmatter에 `isolation: worktree`가 있어 구현 작업은 worktree에서 수행한다.

`pipeline` 명령은 `.pipeline/02-impl.md`를 요구하지만, 에이전트 원본에는 그 파일의 고정 형식이 별도로 정의되어 있지 않다. 실행 시 두 원본을 함께 확인한다.
