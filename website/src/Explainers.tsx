import { Link } from 'react-router-dom'
import {
  ArticleCareNote,
  ArticleCta,
  ArticleLayout,
} from './Article'

type ExplainerPageProps = {
  onCookiePreferences?: () => void
}

export function MicroJournalingPage({ onCookiePreferences }: ExplainerPageProps) {
  return (
    <ArticleLayout
      label="Guide"
      title="What is micro journaling"
      documentTitle="What is micro journaling | Journal42"
      description="Micro journaling is writing a short fragment when your head is loud. Learn how two minutes of writing can help you put a thought down and walk away."
      path="/micro-journaling"
      lead="You do not need an hour. You need a place for the thought that will not leave."
      onCookiePreferences={onCookiePreferences}
    >
      <h2>What journaling is doing for you</h2>
      <p>
        When a thought keeps running, writing moves it out of your head onto a
        page. Your nervous system often treats an unfinished loop as work still
        open. Naming it, even badly, gives the loop somewhere to sit.
      </p>
      <p>
        That can mean sleeping sooner. Or cooking without replaying standup. Or
        picking the kids up without the review still in your mouth.
      </p>

      <h2>What micro journaling is</h2>
      <p>
        Micro journaling is a short entry on purpose. One sentence. A messy
        paragraph. Half a thought you have not finished yet. You write before
        you know the point.
      </p>
      <p>
        You do not wait for a clean hour, a quiet desk, or a finished feeling.
        Two minutes counts. A fragment about Slack still open after the house
        goes quiet counts.
      </p>

      <h2>Why short entries help</h2>
      <p>
        Long pages ask for performance. Short ones ask for honesty. When you
        are tired, honesty is what you can actually do.
      </p>
      <p>
        Over days, short entries stack into a record. You start to see what keeps
        returning: the same coworker, the same money worry, the same 1 a.m.
        question. Patterns show up because you wrote them down when they were
        hot.
      </p>

      <h2>How to try it tonight</h2>
      <p>
        Set a two-minute timer. Write what is loud. Stop when the timer ends,
        even mid-sentence. Close the page. Do something with your hands: dishes,
        a shower, the walk to bed.
      </p>
      <p>
        Come back tomorrow only if your mind gets loud again. That is the whole
        practice.
      </p>
      <p>
        For specific nights, see{' '}
        <Link to="/journaling-for-anxiety">journaling for anxiety</Link>,{' '}
        <Link to="/journaling-for-stress">journaling for stress</Link>, or{' '}
        <Link to="/journaling-when-you-cant-sleep">
          journaling when you cannot sleep
        </Link>
        . More situations live in <Link to="/for">For you</Link>.
      </p>

      <ArticleCareNote />
      <ArticleCta event="cta_start_free_micro_journaling" />
    </ArticleLayout>
  )
}

export function PrivateJournalPage({ onCookiePreferences }: ExplainerPageProps) {
  return (
    <ArticleLayout
      label="Guide"
      title="Private journal"
      documentTitle="Private journal | Journal42"
      description="Why a private journal helps when the thought is still running. How to keep writing that stays yours, and what to put on the page."
      path="/private-journal"
      lead="Private writing needs a page nobody else reads."
      onCookiePreferences={onCookiePreferences}
    >
      <h2>Why privacy matters for hard writing</h2>
      <p>
        You write differently when you know a partner, a boss, or a feed might
        see it. Private writing lets you say the ugly line, the scared line, the
        sentence you would never put in a text.
      </p>
      <p>
        That honesty is often the point. The page holds what you cannot say at
        dinner.
      </p>

      <h2>What to keep private</h2>
      <p>
        Keep the journal somewhere only you open. Paper in a drawer. A notes
        app with a lock. An online journal tied to your account. The tool
        matters less than the habit of a closed door around the words.
      </p>
      <p>
        If a tool uses AI on your writing, read how that works. Know what leaves
        your device and what stays with you. Journal42 offers optional{' '}
        <Link to="/journal-lock">journal lock</Link> to encrypt saved entries
        on your device before sync.
      </p>

      <h2>A simple private practice</h2>
      <p>
        Write the fragment. Date it if you want. Stop after a few minutes. Do
        not edit for tone. Come back when the next hard hour shows up.
      </p>
      <p>
        Learn the short form in{' '}
        <Link to="/micro-journaling">what micro journaling is</Link>. For nights
        that match yours, browse <Link to="/for">For you</Link>.
      </p>

      <ArticleCareNote />
      <ArticleCta event="cta_start_free_private_journal" />
    </ArticleLayout>
  )
}

export function AiJournalPage({ onCookiePreferences }: ExplainerPageProps) {
  return (
    <ArticleLayout
      label="Guide"
      title="AI journal"
      documentTitle="AI journal | Journal42"
      description="How an AI journal can help after you write: a short reflection on your own words, then space to answer or walk away."
      path="/ai-journal"
      lead="Write first. Let a short reflection meet you after."
      onCookiePreferences={onCookiePreferences}
    >
      <h2>What an AI journal can do</h2>
      <p>
        You still do the hard part: getting the thought onto the page. Some
        tools then return a short reflection based on what you wrote. That can
        name a feeling you skipped, or a pattern sitting under the noise.
      </p>
      <p>
        Use it like a second read. Reply if you want to go further. Close it if
        you already feel quieter.
      </p>

      <h2>Keep the writing yours</h2>
      <p>
        Start with your words, in your voice. Half-thoughts are enough. Let the
        reflection follow the entry. Skip anything that feels like a prompt you
        did not ask for.
      </p>
      <p>
        Check privacy before you pour private writing into any tool. Know whether
        your writing trains models, who can see it, and how to delete it.
      </p>

      <h2>A two-minute loop</h2>
      <p>
        Write a fragment. Read the reflection once. Answer one line if it helps.
        Walk away. That is enough for most evenings.
      </p>
      <p>
        More on the practice:{' '}
        <Link to="/micro-journaling">what micro journaling is</Link>. More on
        keeping the page closed:{' '}
        <Link to="/private-journal">private journal</Link>. If the ChatGPT tab
        is already open, read{' '}
        <Link to="/chatgpt-as-a-journal">using ChatGPT as a journal</Link>.
      </p>

      <ArticleCareNote />
      <ArticleCta event="cta_start_free_ai_journal" />
    </ArticleLayout>
  )
}

export function ChatGptAsJournalPage({ onCookiePreferences }: ExplainerPageProps) {
  return (
    <ArticleLayout
      label="Guide"
      title="Using ChatGPT as a journal"
      documentTitle="Using ChatGPT as a Journal | Journal42"
      description="Using ChatGPT for journaling? Chat threads are a bad fit. Here is why, and how a private AI journal saves dated entries with a short reflection."
      path="/chatgpt-as-a-journal"
      lead="ChatGPT is good for answers. It is a bad place to keep a journal."
      onCookiePreferences={onCookiePreferences}
    >
      <p>
        If you use ChatGPT for journaling, you are not alone. Many people paste
        private thoughts into a chat thread instead of a private journal. This
        guide explains what goes wrong, and what works better.
      </p>

      <h2>Why ChatGPT is bad as a journal</h2>
      <p>Here is what goes wrong when you use ChatGPT as a journal:</p>
      <ul>
        <li>
          <strong>It keeps answering.</strong> Every message you send gets a
          reply, so one line from you pulls another line back and the thread
          keeps going.
        </li>
        <li>
          <strong>It tries to reassure you.</strong> ChatGPT agrees and tells
          you what to do. You needed a reflection on your thoughts, tied to
          your previous entries and who you actually are. Without that record,
          the reply stays generic.
        </li>
        <li>
          <strong>You write for the model, not for yourself.</strong> You edit
          the line and add context so it can answer well. The thought that was
          actually bothering you never gets written. You close the tab, but it
          is still in your head.
        </li>
        <li>
          <strong>Your words get buried.</strong> You write a few lines.
          ChatGPT writes most of the page. Every reply adds more text from the
          model, and your original lines get pushed up the thread. Go back
          later and you have to scroll past its answers to find what you
          actually said.
        </li>
        <li>
          <strong>There is no real record.</strong> A chat thread is not a
          journal. Your entries are not dated. They are not saved as yours in
          one place. You cannot open last Tuesday, or notice that the same
          problem has shown up five times this month. What you wrote stays
          scattered across conversations you will not go back to.
        </li>
        <li>
          <strong>It sits next to everything else.</strong> What you wrote at
          1 a.m. lives in the same app as work questions, code, email drafts,
          and random searches. One sidebar holds all of it. A thread about the
          review sits next to a thread about tomorrow's meeting. There is no
          sacred place for a journal.
        </li>
      </ul>

      <h2>Why Journal42 is a better fit</h2>
      <p>
        Journal42 is a private AI journal. You write a fragment. It saves to
        your account. You get a short reflection on what you wrote. You can
        reply if you want to go further, then stop.
      </p>
      <p>
        Your entry is the page, not one line in a long chat. Entries stack by
        date in one place, and the reflection can read what you wrote before.
        It is a journal app, not a general assistant with your private
        thoughts mixed with everything else.
      </p>
      <p>
        Writing and saving stay free.{' '}
        <Link to="/privacy">See Privacy</Link> for how your journal is handled.{' '}
        <Link to="/pricing">See pricing</Link> if you want more reflections
        and replies in a day.
      </p>

      <h2>Try it tonight</h2>
      <p>
        Close the ChatGPT tab. Write what is loud, even one messy sentence.
        Read the reflection once. Close the page. That is enough to put down the
        thought and walk away.
      </p>
      <p>
        More on how the reflection works:{' '}
        <Link to="/ai-journal">AI journal</Link>. More on keeping writing
        private: <Link to="/private-journal">private journal</Link>. More on
        the short form:{' '}
        <Link to="/micro-journaling">micro journaling</Link>.
      </p>

      <ArticleCareNote />
      <ArticleCta event="cta_start_free_chatgpt_journal" />
    </ArticleLayout>
  )
}
