# 오케스트레이션 전체 개요

[명령 원본](../.claude/commands/)과 [에이전트 원본](../.claude/agents/)은 Claude Code가 작업을 위임하는 선언적 실행 지침이다. 이 프로젝트에는 고정된 순차·동시 흐름과 요청에 따라 담당자를 고르는 동적 흐름이 함께 있다.

## 어떤 명령을 선택할까?

| 상황 | 명령 | 실행 형태 |
|---|---|---|
| 요구사항부터 구현·테스트·리뷰까지 진행 | [`pipeline`](orchestration/pipeline.md) | 4단계 순차 |
| 테스트와 리뷰처럼 독립적인 점검을 함께 수행 | [`parallel-check`](orchestration/parallel-check.md) | 2개 작업 동시 |
| 과제 성격에 맞는 담당자 하나만 필요 | [`dispatch`](orchestration/dispatch.md) | 동적 선택 후 1회 호출 |
| 구현 후 높은 심각도 리뷰 지적을 수정 | [`handoff`](orchestration/handoff.md) | 구현↔리뷰 왕복 |
| 특정 경로만 평가 | [`agents-review`](orchestration/agents-review.md) | reviewer 단독 |

## 흐름 비교

```text
pipeline:       requirements-analyst → implementer → tester → reviewer
parallel-check:                         tester ┐
                                               ├→ 하나의 결과 표
                                      reviewer ┘
dispatch:       dispatcher → 선택된 담당자 1회
handoff:        implementer → reviewer → (높음이면 implementer로 반환)
```

`dispatch`는 다중 에이전트 흐름의 상위 조합기가 아니다. `/dispatch`에서는 병렬 실행, 재배정, 보조 담당, 다른 오케스트레이션 명령의 후속 실행을 하지 않는다.

## 데이터 전달

- `pipeline`은 앞 단계의 결과와 파일 산출물을 다음 단계의 입력으로 넘긴다.
- `parallel-check`는 동일한 대상에서 독립적으로 출발하고, 두 작업이 끝난 뒤 결과를 취합한다.
- `dispatch`는 사용자의 과제 원문을 바꾸지 않고 선택된 담당자에게 한 번 전달한다.
- `handoff`는 리뷰의 높은 심각도 지적을 다음 구현 입력으로 전달한다.

## 실패 경계

- `pipeline`: 실패한 단계를 최대 세 번까지 같은 단계에서 재시도한 뒤 중단한다.
- `handoff`: 최대 세 회 왕복하며, 그 뒤에도 높은 지적이 남으면 사람에게 넘긴다.
- `dispatch`: 배정 형식이 잘못되거나 담당 작업이 실패해도 추가 담당을 호출하지 않는다.
- `parallel-check`: 양쪽 결과를 모두 모아 통합 보고하고, 모순이면 선택 근거를 적는다.

## 문서의 책임 경계

이 문서는 실행 규칙을 새로 정의하지 않는다. 실행 시점에는 각 상세 문서의 `실행 원본` 링크를 따라 `.claude/commands/`와 `.claude/agents/`를 기준으로 삼는다. 원본과 해설이 다르면 원본을 우선하고, 차이는 변경 시 함께 정리할 사항으로 기록한다.
