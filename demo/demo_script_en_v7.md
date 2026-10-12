# v7 English narrated demo script

112.20 seconds. Edited screenshots from actual prototype operations, not a continuous screen recording. Original interface labels are Traditional Chinese, with English explanations. English narration uses macOS Samantha; the application uses existing Taigi speech services.

## Scene 1 | 0–13.28 seconds

Taiwanese Speech Bridge

A visitor speaks Taiwanese. A reception worker speaks Mandarin. Our prototype helps them communicate through speech recognition, translation, and audio playback. It does not use a large language model.

## Scene 2 | 13.28–25.0 seconds

Visitor: Where is the reception desk?

For this test, our own translation and Taiwanese speech synthesis created the question, Where is the reception desk? The input is synthetic Taiwanese audio, not a recording of a visitor.

## Scene 3 | 25.0–41.6 seconds

Upload WAV and recognize speech

These are screenshots from actual prototype operations. The interface is in Traditional Chinese, with English explanations. We selected Taiwanese, uploaded the WAV, and called our own speech recognition server. This request took about zero point eight seconds.

## Scene 4 | 41.6–54.12 seconds

Review and correct the original

The recognition result contains errors. We show them honestly. The operator refers to the known test sentence and corrects the original question before translating. This check is essential for communication.

## Scene 5 | 54.12–67.16 seconds

Translate and review

After correction, our translation service returns the Mandarin question, Where is the reception desk? This request took about zero point two seconds. The user can still edit the translation before playing it.

## Scene 6 | 67.16–80.44 seconds

Play the confirmed translation

The user confirms the text and requests Mandarin speech. Our own text to speech server generates the audio in just over one second. The browser plays it, so the reception worker can hear the question and respond.

## Scene 7 | 80.44–95.6 seconds

Server APIs now; device integration next

The current prototype runs recognition, translation, and speech synthesis on our own servers. The next step is to deploy suitable models in the designated competition environment and measure performance. Hardware integration is not complete.

## Scene 8 | 95.6–112.2 seconds

Review first, then communicate

The prototype connects two languages through text that people can review. These single sample measurements include network time. They do not establish recognition accuracy or accelerator performance. Next, we will evaluate real speech and verify the required hardware.

