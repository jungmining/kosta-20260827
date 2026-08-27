#!/usr/bin/env node

process.stdin.resume();
process.stdin.on('end', () => {
  process.stdout.write(JSON.stringify({
    continue: false,
    stopReason: 'PreToolUse 테스트 훅이 모든 도구 호출을 차단했습니다.',
    hookSpecificOutput: {
      hookEventName: 'PreToolUse',
      permissionDecision: 'deny',
      permissionDecisionReason: '테스트용 차단 훅입니다.'
    }
  }));
});
