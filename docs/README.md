# 오케스트레이션 문서

이 디렉터리는 Claude Code에서 사용하는 에이전트 오케스트레이션을 사람이 이해하기 쉽게 설명한다.

> **원본 우선:** 실제 실행 계약과 가드레일은 [`.claude/commands/`](../.claude/commands/)와 [`.claude/agents/`](../.claude/agents/)의 Markdown이 기준이다. `docs/`는 해설과 탐색을 위한 문서이며 원본을 대체하지 않는다.

## 권장 읽는 순서

1. [전체 개요](orchestration-overview.md)에서 흐름 선택 기준을 확인한다.
2. [명령별 문서](orchestration/)에서 사용할 명령의 입력·출력·실패 정책을 확인한다.
3. [에이전트 문서](agents/)에서 각 담당자의 권한과 출력 계약을 확인한다.
4. 실행 전 상세 규칙은 대응하는 `.claude/` 원본을 다시 확인한다.

## 명령 문서

| 명령 | 용도 |
|---|---|
| [`dispatch`](orchestration/dispatch.md) | 요청에 맞는 담당자 하나를 선택해 한 번만 호출 |
| [`handoff`](orchestration/handoff.md) | 구현과 리뷰를 반복하며 높은 심각도 지적을 해소 |
| [`pipeline`](orchestration/pipeline.md) | 요구사항 분석부터 리뷰까지 네 단계를 순차 실행 |
| [`parallel-check`](orchestration/parallel-check.md) | 테스트와 리뷰를 동시에 수행 |
| [`agents-review`](orchestration/agents-review.md) | 지정한 경로를 리뷰어에게 단독 위임 |

## 에이전트 문서

| 에이전트 | 책임 |
|---|---|
| [`dispatcher`](agents/dispatcher.md) | 담당자 하나 선택 |
| [`requirements-analyst`](agents/requirements-analyst.md) | 요구사항 분석 |
| [`implementer`](agents/implementer.md) | 구현 및 테스트 확인 |
| [`tester`](agents/tester.md) | 테스트 작성 및 실행 |
| [`reviewer`](agents/reviewer.md) | 규약·보안·성능·유지보수성 리뷰 |

원본 명령과 에이전트가 변경되면 이 문서와 대응 상세 문서의 내용·링크를 함께 점검한다.
