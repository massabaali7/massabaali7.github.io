A speaker verification model that scores 99% on a clean academic benchmark can come apart on a three-second phone call recorded in a cafe. This isn't a hypothetical — it's the gap between how we *evaluate* these systems and how they're actually *used*.

## Benchmarks are a wish, stated precisely

Every benchmark is an implicit claim about what matters. When the community optimizes against VoxCeleb-style evaluation, it's saying: long-ish, reasonably clean, mostly-English celebrity speech is the target. Models dutifully get better at exactly that.

But deployments live somewhere else entirely. Real conditions include:

- **Short duration** — a few seconds, not a few minutes.
- **Spontaneous speech** — interruptions, disfluencies, overlapping talk.
- **Channel and microphone mismatch** — enroll on a laptop, verify on a phone.
- **Environmental noise** — traffic, cafes, wind.
- **Adversarial and spoofed inputs** — replay attacks, synthesis, conversion.

Most existing benchmarks test a *subset* of these and stay silent on the rest. A model can look state-of-the-art while having a gaping, untested weakness.

## What SVeritas tries to do

[SVeritas](publications.html#sveritas) is an attempt to make the wish more honest. It's a comprehensive suite that evaluates verification systems across a wide span of stressors — duration, spontaneity, content, noise, microphone variation, and maliciously created mismatches — under one roof.

The goal isn't to crown a winner. It's to produce a **profile**: this system is robust to noise but brittle to short duration; that one resists spoofing but degrades on channel mismatch. A single accuracy number hides all of that. A profile makes the trade-offs visible.

> You can't fix what you don't measure. And right now, the field measures only part of the picture.

## A note on humility

Building a benchmark is a strange kind of research — you spend your effort making it *easier* for other people to find flaws, including in your own methods. But that's exactly the point. Robustness claims should be cheap to falsify. If SVeritas makes it easier to show that a verifier breaks under realistic conditions, it's doing its job.
