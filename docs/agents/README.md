# 에이전트 역할 문서

각 에이전트의 실행 원본은 [`.claude/agents/`](../../.claude/agents/)에 있다. 아래 문서는 역할과 관계를 설명하며, 도구·쓰기 권한·출력 형식은 원본을 실행 계약으로 삼는다.

## 역할표

| 에이전트 | 책임 | 쓰기 범위 |
|---|---|---|
| [`dispatcher`](dispatcher.md) | 담당자 하나 선택 | 없음 |
| [`requirements-analyst`](requirements-analyst.md) | 요구사항 분석 | 분석 문서 작성 가능 |
| [`implementer`](implementer.md) | 코드 구현 | 코드·문서 수정 가능, worktree 격리 |
| [`tester`](tester.md) | 테스트 작성·실행 | `tests/` 아래 |
| [`reviewer`](reviewer.md) | 규약·보안·성능·유지보수성 리뷰 | 없음 |

## 호출 관계

- `dispatcher`는 `/dispatch`에서 네 담당자 중 하나를 고른다.
- `requirements-analyst`, `implementer`, `tester`, `reviewer`는 `/pipeline`의 네 단계에 대응한다.
- `tester`와 `reviewer`는 `/parallel-check`에서 동시에 호출된다.
- `implementer`와 `reviewer`는 `/handoff`에서 왕복한다.
- `reviewer`는 `/agents-review`에서 단독으로 호출된다.

## 출력 계약 주의

`pipeline` 명령이 요구하는 `.pipeline/` 산출물과 개별 에이전트 원본의 출력 지침은 완전히 같은 계약이 아니다. 실행 시에는 명령 원본과 해당 에이전트 원본을 모두 확인한다.
