export type SituationGroup = 'work' | 'home' | 'relationship' | 'night'

export type Situation = {
  slug: string
  path: string
  group: SituationGroup
  title: string
  documentTitle: string
  description: string
  lead: string
  indexLabel: string
  paragraphs: string[]
}

export const SITUATION_GROUPS: { id: SituationGroup; label: string }[] = [
  { id: 'work', label: 'Work' },
  { id: 'home', label: 'Home' },
  { id: 'relationship', label: 'Relationship' },
  { id: 'night', label: 'The night' },
]

export const SITUATIONS: Situation[] = [
  {
    slug: 'journaling-for-anxiety',
    path: '/journaling-for-anxiety',
    group: 'night',
    title: 'Journaling for anxiety',
    documentTitle: 'Journaling for anxiety | Journal42',
    description:
      'How journaling for anxiety can help when a thought keeps looping. What to write, how long to sit with it, and when to stop.',
    lead: 'When the thought is still running after the house goes quiet.',
    indexLabel: 'Journaling for anxiety',
    paragraphs: [
      'Anxiety keeps a tab open. The review. The message. The thing you said at dinner. It loops while the kids sleep and Slack is still lit. Your body is home. Your head is still at work.',
      'Writing helps because it turns a fog into lines. Once the worry has words, you can see it. You can also stop feeding it for a few minutes. That pause is often the first relief.',
      'Try this tonight. Set a timer for two minutes. Write only what is loud. Do not fix it on the page. Stop when the timer ends, even mid-sentence. Close the notebook or the app. Do something with your hands before you check your phone again.',
      'If you want a prompt, use one line: “The thought that will not leave is…” Then list body signals if you notice them: tight chest, clenched jaw, restless legs. Naming the body can shrink the story the mind is telling.',
      'Come back only when the loop returns. You are building a small record of what anxiety sounds like for you, and what helps it loosen.',
    ],
  },
  {
    slug: 'journaling-for-stress',
    path: '/journaling-for-stress',
    group: 'night',
    title: 'Journaling for stress',
    documentTitle: 'Journaling for stress | Journal42',
    description:
      'How journaling for stress helps when the day will not clock out. A simple way to name the pile and put it down.',
    lead: 'When stress will not clock out with you.',
    indexLabel: 'Journaling for stress',
    paragraphs: [
      'Sprint, dentist, and dinner in one head. The ticket is still open. Pickup was late. You are home and the day is not done. Stress loves unfinished lists.',
      'A short journal entry does not solve the sprint. It empties the mental clipboard so your evening has a chance. You are telling your brain: these items are captured, they can wait until morning.',
      'Write the pile as bullets. Work. Home. Money. People. Leave blanks. You do not need neat categories. Two minutes of dumping beats another hour of silent sorting.',
      'Circle one item that can wait until tomorrow. Cross out anything that is already done but still buzzing. Then walk away from the page. Stress often softens when the list exists outside your skull.',
      'If the same stressors show up week after week, the journal becomes evidence. That can help you ask for help, change a boundary, or simply stop gaslighting yourself about how full the days are.',
    ],
  },
  {
    slug: 'journaling-after-a-breakup',
    path: '/journaling-after-a-breakup',
    group: 'relationship',
    title: 'Journaling after a breakup',
    documentTitle: 'Journaling after a breakup | Journal42',
    description:
      'How journaling after a breakup can help you hold the anger, missing, and replay without sending another text.',
    lead: 'When the relationship ended and the night did not.',
    indexLabel: 'After a breakup',
    paragraphs: [
      'The apartment is quieter. Your phone is louder. You replay the last conversation and the one before that. Breakups leave open loops: what you should have said, what they meant, who you are now.',
      'Writing gives those loops a private room. You can be unfair on the page. You can be soft. You can write the message you will not send. That is often safer than another late scroll through old photos.',
      'Try three short headings on separate nights: what hurts, what I miss, what I will not carry forward. One paragraph each. You do not need a full postmortem in one sitting.',
      'If you feel the urge to text, write the text into the journal first. Read it once. Sleep on it. Many people find the urge drops after the words have somewhere to land.',
      'Grief after a breakup moves in waves. Keep the practice small so you can return when the next wave hits, without needing a perfect routine.',
    ],
  },
  {
    slug: 'journaling-when-you-cant-sleep',
    path: '/journaling-when-you-cant-sleep',
    group: 'night',
    title: 'Journaling when you cannot sleep',
    documentTitle: 'Journaling when you cannot sleep | Journal42',
    description:
      'How a short brain dump before bed can help when racing thoughts keep you awake. What to write and when to stop.',
    lead: 'Racing thoughts. The clock. The same loop.',
    indexLabel: 'When you cannot sleep',
    paragraphs: [
      'You are awake because the thought will not clock out. Tasks. Worries. The message that did not come. Your brain treats unfinished items like open tabs. Sleep waits while the tabs stay active.',
      'A bedtime brain dump is a way to externalize those tabs. Research on writing unfinished tasks before sleep suggests it can shorten the time it takes to fall asleep, because the mind trusts something else is holding the list.',
      'Keep a page by the bed. Write until the urgency drops, or for two minutes, whichever comes first. Include tomorrow’s first small step if a task is loud. Then put the pen down. Dim the light. Do not start editing the list.',
      'Avoid turning the dump into problem-solving at 1 a.m. Capture, date, close. Morning is for decisions. Night is for parking the noise.',
      'If nights stay rough for weeks, or fear of sleep itself grows, talk with a clinician. Writing can help a loud mind. Chronic insomnia may need more support.',
    ],
  },
  {
    slug: 'journaling-for-burnout',
    path: '/journaling-for-burnout',
    group: 'work',
    title: 'Journaling for burnout',
    documentTitle: 'Journaling for burnout | Journal42',
    description:
      'How journaling for burnout can help when you are still shipping and emptied out. Small entries when the tank is low.',
    lead: 'When the work still asks and you have nothing left.',
    indexLabel: 'Burnout',
    paragraphs: [
      'You are still shipping. You are also emptied out. Monday feels like Thursday. The standup voice is gone before the meeting starts. Burnout often looks like competence on the outside and fog on the inside.',
      'Journaling here is maintenance, not a productivity hack. You are checking the gauge. What drained you. What still matters. What you cannot feel anymore.',
      'Write one honest line a day if that is all you have: “Today I had nothing left after…” or “The part of me that used to care about X went quiet.” Short entries protect you from another performance on the page.',
      'Once a week, skim the lines. Look for patterns: the same meeting, the same person, the same lack of recovery. That record can help you talk to a manager, a doctor, or a friend with specifics instead of a vague “I’m tired.”',
      'Rest is part of the work. The journal is a witness. It does not have to fix your job tonight.',
    ],
  },
  {
    slug: 'hard-boss',
    path: '/for/hard-boss',
    group: 'work',
    title: 'Journaling with a hard boss',
    documentTitle: 'Journaling with a hard boss | Journal42',
    description:
      'How to use journaling when a hard boss is still in your head after hours. Separate facts, feelings, and what you will do next.',
    lead: 'The feedback landed. Your evening did not.',
    indexLabel: 'A hard boss',
    paragraphs: [
      'The 1:1 is over. The Slack thread is not. You are reheating dinner and replaying the tone. A hard boss can rent space in your evening without paying rent.',
      'Write three columns if you can: what was said, how it landed, what is true tomorrow. Separating fact from story cools the replay. You may find the feedback was harsh and also partly useful, or harsh and unfair. Both deserve ink.',
      'Add one line for your body: where the stress sits. Jaw. Stomach. Shoulders. Then one line for a boundary you can keep: when you will check Slack, what you will ask for in writing, who you will talk to.',
      'Stop before you draft the perfect reply. Sleep first. Hard bosses often get clearer responses in the morning than in the heat of the night.',
    ],
  },
  {
    slug: 'coworker',
    path: '/for/coworker',
    group: 'work',
    title: 'Journaling with a hard coworker',
    documentTitle: 'Journaling with a hard coworker | Journal42',
    description:
      'How journaling helps after a hard coworker moment: credit taken, air taken, meeting still playing on the train home.',
    lead: 'Talked over in standup. Still carrying it home.',
    indexLabel: 'A hard coworker',
    paragraphs: [
      'They took the credit. Or the air. Or the ticket you owned. You are on the train and the meeting is still playing. Coworker friction sticks because it mixes status, fairness, and daily proximity.',
      'On the page, describe the scene once without adjectives. Then write how you felt in plain words: small, furious, invisible, confused. Then write what you wish had happened. That third paragraph often shows the need underneath the anger.',
      'Ask one practical question in writing: do I need a private conversation, a documented trail, or distance for now? You do not have to answer tonight. Naming the options reduces the loop.',
      'Leave the journal before you send a spicy Slack. Tomorrow’s you can decide with a cooler head.',
    ],
  },
  {
    slug: 'performance-review',
    path: '/for/performance-review',
    group: 'work',
    title: 'Still replaying the review',
    documentTitle: 'Still replaying the review | Journal42',
    description:
      'How to journal after a performance review when one line keeps replaying. Separate rating, meaning, and next step.',
    lead: 'The review ended. Your head did not.',
    indexLabel: 'Still replaying the review',
    paragraphs: [
      'Snapped at home. Still replaying the review. The rating. The soft language. The one line that stuck. Reviews compress a year into a few sentences, so your mind keeps unpacking them after hours.',
      'Write the exact line that hurts. Quote it. Then write your first interpretation. Then write a second interpretation that is kinder or more precise. Reviews are often blunt instruments. Your journal can hold more than one reading.',
      'Add a “next week” note: one skill to practice, one question to ask, or one win to document. Moving from rumination to a small plan helps the evening end.',
      'If you snapped at someone you love, write a short repair note to yourself: what the review triggered, what you will say tomorrow. The page can catch the spill before it spreads.',
    ],
  },
  {
    slug: 'laid-off',
    path: '/for/laid-off',
    group: 'work',
    title: 'Journaling after a layoff',
    documentTitle: 'Journaling after a layoff | Journal42',
    description:
      'How journaling after a layoff can hold shock, money fear, and identity without forcing a five-year plan tonight.',
    lead: 'The badge is gone. The loop is not.',
    indexLabel: 'Laid off',
    paragraphs: [
      'You got the call. Or the calendar invite. The house is quiet and every hour asks what next. Layoffs hit money, status, routine, and belonging at once.',
      'Give each wave its own entry. Shock. Anger. Relief if it is there. Money math. Who you are without the title. You do not have to process all of it in one sitting.',
      'When panic rises, write only the next 24 hours: who to tell, what to download, when to rest. Big futures can wait until the nervous system is less flooded.',
      'Keep a separate list of people and skills you trust. On low days, read that list. The journal can hold both the loss and the parts of you that still work.',
    ],
  },
  {
    slug: 'hard-spouse',
    path: '/for/hard-spouse',
    group: 'home',
    title: 'Journaling with a hard spouse',
    documentTitle: 'Journaling with a hard spouse | Journal42',
    description:
      'How private journaling can help after conflict with a spouse: say the hard line on the page before you say it in the kitchen.',
    lead: 'After the door closes and the words stay.',
    indexLabel: 'A hard spouse',
    paragraphs: [
      'The fight ended in the kitchen. Or it never quite started. You are both under the same roof and miles apart. Partner conflict is loud even in silence.',
      'Write somewhere private. Say the line you are afraid to say out loud. Then write what you think they are feeling, even if you disagree. Then write what you need in one sentence.',
      'That third sentence is often what the fight was about underneath the dishes, the tone, the schedule. Seeing it can change the next conversation.',
      'If the pattern is scary or unsafe, journaling is still useful, and so is outside help. Use the page to clarify, then reach for support that fits the risk.',
    ],
  },
  {
    slug: 'children',
    path: '/for/children',
    group: 'home',
    title: 'Journaling through hardship with children',
    documentTitle: 'Journaling through hardship with children | Journal42',
    description:
      'How to journal when parenting is hard and the day still runs after bedtime. Short entries for a tired nervous system.',
    lead: 'Kids asleep. Your nervous system still on.',
    indexLabel: 'Hardship with children',
    paragraphs: [
      'Bedtime was a negotiation. Homework. Screens. The worry about school. You finally sit down and the day is still loud. Parenting stress often has no clean end point.',
      'Use the quiet scrap you have. Two minutes. Write what was hardest, what went better than you expected, and one need of yours that went unmet. Parents forget the third one.',
      'If guilt shows up, put it on the page instead of arguing with it in your head. Guilt that has words is easier to sort from useful responsibility.',
      'Over a week, patterns appear: the witching hour, the morning rush, the school email that ruins dinner. Seeing the pattern is the first step to changing one small thing.',
    ],
  },
  {
    slug: 'new-baby',
    path: '/for/new-baby',
    group: 'home',
    title: 'Journaling with a new baby',
    documentTitle: 'Journaling with a new baby | Journal42',
    description:
      'How micro journaling fits life with a new baby when you have ninety seconds and a loud mind.',
    lead: 'No clean block of time. Still need a place for the thought.',
    indexLabel: 'A new baby',
    paragraphs: [
      'Feeds. Diapers. The 3 a.m. window. You have ninety seconds while they settle. Traditional journaling advice ignores this season.',
      'Micro journaling fits. One sentence on your phone. A short voice note. A line about how empty or full or strange you feel. Half-thoughts are the only thoughts you have. Getting it out of your head is the help: the loop has a place, so your body can rest for a stretch. Looking back later is optional. Some people find patterns in old entries. Others never open them again. Both are fine.',
      'Track mood and support in tiny marks if words are too much: a number from 1 to 5, who helped today, whether you ate. Later you will be glad the fog had a few pins in it.',
      'You are not behind on a practice. You are surviving a stretch. Write when a scrap of night appears. Skip when it does not.',
    ],
  },
  {
    slug: 'coparenting',
    path: '/for/coparenting',
    group: 'home',
    title: 'Journaling while coparenting',
    documentTitle: 'Journaling while coparenting | Journal42',
    description:
      'How journaling after a hard handoff can cool the next text and keep the focus on what the kids need.',
    lead: 'After handoff. Before the next text.',
    indexLabel: 'Coparenting',
    paragraphs: [
      'Drop-off went sideways. Or the schedule changed again. You are alone in the car and the exchange is still in your chest. Coparenting mixes logistics with old relationship heat.',
      'Before you text, write. What happened. What you want to say. What the kids need from the next message. Often the third line is shorter and cleaner than the first draft in your head.',
      'Keep a log of schedule changes and agreements if conflict is high. Facts on a page protect you from rewriting history in anger.',
      'Then close the journal and drive. The point is a cooler nervous system before the next coordination, not a perfect essay about the other parent.',
    ],
  },
  {
    slug: 'money',
    path: '/for/money',
    group: 'home',
    title: 'Journaling for money stress',
    documentTitle: 'Journaling for money stress | Journal42',
    description:
      'How journaling for money stress can separate fear from facts so the night can end before the spreadsheet does.',
    lead: 'The numbers stay after the spreadsheet closes.',
    indexLabel: 'Money stress',
    paragraphs: [
      'Rent. The bill. The job that might shift. You close the laptop and the math keeps going. Money stress is often fear wearing a calculator’s clothes.',
      'Write two lists: numbers you know, fears you are guessing. Mixing them keeps you awake. Separating them shows what needs a plan in daylight and what needs soothing tonight.',
      'Add one sentence about values: what this money is for, who you are protecting, what “enough” would feel like for a month. Values give the fear a frame.',
      'Stop before midnight budgeting spirals. Capture, sleep, return with coffee. Decisions made in panic cost more than sleep.',
    ],
  },
  {
    slug: 'divorce',
    path: '/for/divorce',
    group: 'relationship',
    title: 'Journaling during a divorce',
    documentTitle: 'Journaling during a divorce | Journal42',
    description:
      'How journaling during a divorce can hold logistics and heartbreak without forcing every decision in one sitting.',
    lead: 'Lawyers, logistics, and a heart that will not sit still.',
    indexLabel: 'During a divorce',
    paragraphs: [
      'Papers. Schedules. The shared calendar that still hurts. You get a quiet hour and it fills with the next decision. Divorce asks your brain to be both clerk and mourner.',
      'Keep two tracks in the journal if it helps: logistics and feelings. Mixing them can make every grocery list feel like a verdict. Separating them lets you cry without losing the deadline.',
      'Write what today cost you emotionally. Write one thing you did to take care of yourself or the kids. Small evidence of care matters on days that feel like failure.',
      'You do not owe the page a final story about the marriage. You owe yourself a place to put today’s weight.',
    ],
  },
  {
    slug: 'cheating',
    path: '/for/cheating',
    group: 'relationship',
    title: 'When a partner cheated',
    documentTitle: 'When a partner cheated | Journal42',
    description:
      'How private journaling can help after betrayal: hold anger, grief, and questions without performing composure.',
    lead: 'The truth landed. Your nights are still sorting it.',
    indexLabel: 'When a partner cheated',
    paragraphs: [
      'You know. Or you found out. Trust is cracked and every quiet minute asks the same questions. Betrayal floods the system with anger, grief, shame, and detective energy.',
      'Write privately. Let the ugly sentences exist. The page can hold what work and family cannot see yet. You do not need a polished narrative of healing on day three.',
      'Useful prompts: what I know, what I fear, what I need in the next week, what I will not decide tonight. That last one protects you from vows and exits made in shock.',
      'If you are unsafe, prioritize safety planning with people and services you trust. Writing clarifies. It does not replace protection.',
    ],
  },
  {
    slug: 'after-a-fight',
    path: '/for/after-a-fight',
    group: 'relationship',
    title: 'Journaling after a fight',
    documentTitle: 'Journaling after a fight | Journal42',
    description:
      'How to journal after a fight so you can cool down before the next text or conversation.',
    lead: 'The volume dropped. Your head did not.',
    indexLabel: 'After a fight',
    paragraphs: [
      'Someone slammed a door. Or went silent. You are in the other room replaying the line that cut. Fights leave adrenaline with nowhere to go.',
      'Write before you send another message. Dump the heat. Then rewrite the one thing you actually need them to understand. Heat drafts and need drafts are different documents.',
      'Note your part in one sentence if you can see it. Note their part in one sentence. Note the pattern if this fight is a rerun. Patterns are easier to change than personalities.',
      'Wait until your body is quieter before you talk. A short walk after writing often does more than a perfect apology composed in fury.',
    ],
  },
  {
    slug: 'considering-leaving',
    path: '/for/considering-leaving',
    group: 'relationship',
    title: 'Considering leaving',
    documentTitle: 'Considering leaving | Journal42',
    description:
      'How private journaling can hold the stay-or-go question at 1 a.m. without forcing a public decision tonight.',
    lead: 'The question sits in the quiet hours.',
    indexLabel: 'Considering leaving',
    paragraphs: [
      'Stay or go. You turn it over at 1 a.m. while everyone else sleeps. Saying it out loud still feels too big. Private writing is a place for questions that are not ready for an audience.',
      'On different nights, write reasons to stay, reasons to leave, and what you are afraid of either way. Do not debate yourself in one paragraph. Let each list breathe.',
      'Add a column for values: safety, respect, growth, kids, peace. Decisions get clearer when they attach to values instead of only to fear of loneliness or fear of conflict.',
      'You do not have to decide on the page tonight. You have to stop carrying the whole question alone in your head until morning.',
    ],
  },
  {
    slug: 'grief',
    path: '/for/grief',
    group: 'night',
    title: 'Journaling through grief',
    documentTitle: 'Journaling through grief | Journal42',
    description:
      'How journaling through grief can meet the wave when the house empties and the missing comes back.',
    lead: 'The day holds. The night opens the door.',
    indexLabel: 'Grief',
    paragraphs: [
      'You got through the errands. Then the house emptied and the missing came back. Grief often waits for quiet. That is why nights feel harder.',
      'Write to them if you want. Write about them. Write how today felt in your body. There is no correct genre. A grocery list with a sob in the margin still counts.',
      'If the wave is huge, set a short timer. Stay with the feeling on the page until it ends, then close with one grounding detail: the chair, the window, the sound of the fridge. That helps you return to the room.',
      'Grief returns. Keep the practice available without forcing daily entries. Consistency here means honesty when the door opens, not a streak.',
    ],
  },
  {
    slug: 'waiting',
    path: '/for/waiting',
    group: 'night',
    title: 'Journaling while you wait',
    documentTitle: 'Journaling while you wait | Journal42',
    description:
      'How journaling while you wait on an offer, a diagnosis, or a message can quiet the refresh loop.',
    lead: 'The answer is not here. Your head is.',
    indexLabel: 'Waiting',
    paragraphs: [
      'An offer. A diagnosis. A message that did not come. Refreshing will not speed it up. Waiting is a special kind of stress: no action, lots of imagination.',
      'Write the best case, the worst case, and the most likely case. Then write what you will do in the next hour that does not depend on the answer. Waiting shrinks when the present gets a job.',
      'Name the body urge: the refresh, the checking, the pacing. Put a boundary on the page: “I check once at 5.” External rules help when willpower is tired.',
      'When the answer comes, you will still have yourself. The journal is practice for that moment too: how you want to receive news without abandoning your day.',
    ],
  },
]

export function situationByPath(path: string): Situation | undefined {
  return SITUATIONS.find((s) => s.path === path)
}

export function situationBySlug(slug: string): Situation | undefined {
  return SITUATIONS.find((s) => s.slug === slug && s.path.startsWith('/for/'))
}

export function situationsInGroup(group: SituationGroup): Situation[] {
  return SITUATIONS.filter((s) => s.group === group)
}
