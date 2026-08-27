# `/agents-review`: 단독 리뷰

[실행 원본](../../.claude/commands/agents-review.md) · [reviewer 원본](../../.claude/agents/reviewer.md)

## 목적과 입력

`$ARGUMENTS`로 받은 경로를 `reviewer` 서브에이전트에게 위임해 평가만 수행한다.

## 계약

- `CLAUDE.md`의 규약을 리뷰 기준으로 삼는다.
- 각 지적에 심각도와 파일·줄 번호를 붙인다.
- 구현자나 테스터를 자동으로 추가하지 않는다.
- 수정 없이 리뷰 결과만 반환한다.

구체적인 리뷰 관점(규약 위반·보안·성능·유지보수성)과 읽기 전용 도구 범위는 reviewer 원본을 기준으로 한다.
