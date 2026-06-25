Speaker recognition has spent more than a decade getting very good at answering a single question: are these two voices the same person? The field calls this *speaker verification*, and the modern answer is an embedding — a few hundred numbers that, ideally, sit close together for the same speaker and far apart for different ones.

It works remarkably well. But a number can't tell you what it heard.

## The gap between deciding and describing

If you hand a trained verification system a recording, it will confidently produce an embedding. What it will not do is tell you that the speaker sounds like an older man with a Levantine Arabic accent speaking in a noisy room. That information is *in* the signal — humans extract it effortlessly — but the standard pipeline throws it away in service of a single similarity score.

This matters for two reasons. The first is practical: forensics, healthcare, accessibility, and customer-facing systems often need a *description*, not just a match. The second is about trust. A system that can only say "match: 0.91" is hard to audit. A system that can say *why* — "same speaker; both samples show the same vocal tract length and dialectal markers" — is something you can reason about.

## CoLMbo: conditioning a language model on a voice

This is the gap [CoLMbo](publications.html#colmbo) was built to close. The idea is to bridge two worlds that usually stay separate:

- a **speaker encoder**, which knows how to turn audio into speaker-discriminative embeddings, and
- a **language model**, which knows how to turn structured information into fluent text.

The connective tissue is a *prefix*: a sequence derived from the audio embedding that we feed into the text model, much like a soft prompt. A learned initial token nudges the embedding space toward speaker-specific clusters, and we train with a speaker-clustering loss alongside the usual cross-entropy. The result is a model that produces customized, prompt-conditioned descriptions — dialect, age, accent, and more — and generalizes zero-shot to speakers and datasets it never saw in training.

> The shift is subtle but, I think, important: from *classifying* a speaker to *talking about* one.

## What I took away

Two things surprised me while building this.

First, **the language model wanted the structure more than I expected.** Giving it a cleanly speaker-discriminative prefix mattered far more than scaling the text decoder. The bottleneck was never fluency; it was whether the acoustic signal arrived in a form the LM could condition on.

Second, **descriptions are a debugging tool.** When the model is wrong, it's wrong in legible ways — it'll confidently assign the wrong accent, and you can trace that back to the encoder. A bare embedding never offers you that.

There's a long way to go. Descriptions can be biased, over-confident, or simply wrong, and a model that *sounds* authoritative about a speaker's demographics carries real risks. But I'm convinced the direction is right: the next generation of speaker models should be able to speak.
