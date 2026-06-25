Self-supervised speech models changed the field. Trained on enormous amounts of unlabeled audio, models like wav2vec 2.0 and HuBERT learn representations that transfer beautifully to transcription, phone recognition, and a long list of content-driven tasks.

They are far less reliable about *who* is speaking.

## Content is easy to supervise for free; identity isn't

The self-supervised objectives that power these models — masked prediction, contrastive learning over local context — are, at heart, about *content*. Predict the masked frame; distinguish this snippet from that one. These tasks reward representations that capture phonetic and linguistic structure, because that's what makes the prediction solvable.

Speaker identity comes along for the ride, partially and inconsistently. It's *present* in the representations — you can often probe it out — but it isn't what the objective optimizes for, so it ends up entangled, layer-dependent, and fragile.

For verification, diarization, and profiling, that's a problem. These tasks need the *speaker-discriminative* structure to be front and center, not a faint signal you have to dig for.

## The tension, stated plainly

There's a genuine tension here, not just an engineering oversight:

- Tasks that need **content** want representations that are *invariant* to the speaker (the word is "cat" no matter who says it).
- Tasks that need **identity** want representations that are *invariant* to the content (it's the same speaker whether they say "cat" or "dog").

A single objective optimizing for one quietly works against the other. So a foundation model tuned purely on content-style self-supervision will, by construction, leave speaker structure underdeveloped.

## Building speaker-awareness in

This is the motivation behind [DELULU](publications.html#delulu): a self-supervised foundation model that deliberately injects speaker structure into its latent units during pretraining, rather than hoping it emerges. The aim is a backbone whose representations are *both* content-rich and strongly speaker-discriminative — so the same model can serve transcription and verification without one starving the other.

The wider point is that "foundation model" is not a single destination. What you put into the objective is what you get out of the representations. If you want a model that knows who is speaking, you have to ask it to learn that — explicitly.
