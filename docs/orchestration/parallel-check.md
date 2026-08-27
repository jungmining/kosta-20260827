# `/parallel-check`: 동시 점검

[실행 원본](../../.claude/commands/parallel-check.md)

## 목적

서로 결과를 기다릴 필요가 없는 테스트와 리뷰를 동시에 실행해 점검 시간을 줄인다.

## 실행 단계

대상은 명령의 `$ARGUMENTS`로 전달된다.

```text
                 ┌─ tester   → tests/에 테스트 작성 + npm test
대상($ARGUMENTS) ┤
                 └─ reviewer → CLAUDE.md 규약 기준 리뷰
```

- `tester`와 `reviewer`를 한 번에 실행한다.
- 둘 사이에 순서를 두지 않는다.
- 둘 다 끝난 뒤 결과를 하나의 표로 통합한다.
- 결과가 모순되면 모순임을 적고 어떤 판단을 선택했는지 근거를 작성한다.

테스터의 수정 범위와 리뷰어의 읽기 전용 규칙은 각각 [tester 원본](../../.claude/agents/tester.md)과 [reviewer 원본](../../.claude/agents/reviewer.md)을 따른다.
