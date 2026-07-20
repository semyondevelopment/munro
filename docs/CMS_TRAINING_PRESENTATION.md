# Training the team to run the website · Presenter script

A ready-to-deliver plan for teaching the Munro team to update the website
themselves in Sanity. Aim for **35–45 minutes**, most of it hands-on.

Everything you demonstrate here is backed by the friendly reference page at
**`/guide`** (e.g. `www.munrocentre.com/guide`) — put that on screen and the
team can follow along and keep it as their leave-behind. It isn't linked from
the public site or shown in Google, so it's yours to share.

---

## Before the session (10 minutes of prep)

- [ ] **Sanity is connected and populated.** Open `/studio` and confirm the
      Homepage, Site settings, Rooms, Educators, Testimonials and FAQs all show
      real content. If the Studio is blank, run the one-time import first
      (`docs/SANITY_SETUP.md`).
- [ ] **Everyone has an invite.** In Sanity → **Manage → Members**, invite each
      staff member who'll edit the site as an **Editor** (they log in with their
      email — no GitHub, no Vercel). Ask them to accept the invite *before* the
      session so they aren't stuck at the login screen.
- [ ] **Make a safe practice spot.** Decide on one harmless thing everyone can
      edit during the hands-on part — a good choice is adding a **draft**
      testimonial, or tweaking the wording of an FAQ. Nothing goes live until
      someone clicks Publish, so this is risk-free.
- [ ] **Open your tabs in advance:** the live site, `/studio`, and `/guide`.
- [ ] **Know the "instant update" story.** After publishing, changes appear in
      about **60 seconds** (immediately if the publish webhook is set up — see
      `SANITY_SETUP.md` step 5). Tell the team so nobody panics waiting.

**In the room / on the call you'll want:** a laptop connected to the screen, the
three tabs above, and each attendee on their own device logged in to `/studio`.

---

## The plan at a glance

| Time | Segment | Goal |
| ---- | ------- | ---- |
| 0:00 | Welcome & why | Set the tone: *you own this, and you can't break it* |
| 0:03 | How the website works | The mental model in 90 seconds |
| 0:06 | Live: signing in | Everyone into `/studio` |
| 0:10 | Live: the tour | What each thing in the left menu is |
| 0:15 | Live: the three moves | Edit text · change a photo · Publish |
| 0:23 | Live: real recipes | Phone number, a review, a room photo |
| 0:30 | Hands-on | Everyone makes one safe edit |
| 0:38 | Golden rules & safety net | Confidence + how to undo |
| 0:41 | Help & wrap-up | Where the guide lives, who to call |

---

## The script

Stage directions are in **DO:**. Suggested words are in **SAY:** — make them
your own, don't read them out.

### 1 · Welcome & why (0:00)

**SAY:** "The website is yours now. Everything you see on it — the words, the
photos, the reviews, our phone number, our hours — you can change yourselves, in
a couple of minutes, without calling anyone. Today I'll show you how. The most
important thing to know up front: **you cannot break it.** You're only ever
editing words and pictures. The design always stays perfect, and nothing you do
is live until *you* decide to publish it."

**DO:** Show the live homepage. Scroll it slowly. Point at three things you'll
edit today — the headline, a family review, the phone number in the footer.

### 2 · How the website works (0:03)

**SAY:** "Two pieces. There's the **website** that families see, and there's the
**editor** — a separate, private page called the Studio where we type our
changes. You make a change in the editor, click Publish, and about a minute
later the website updates itself. That's the whole system."

**DO:** In the address bar, type `/studio` after the site address so they see
it's the same website, just a `/studio` on the end.

> **Analogy that lands well:** "It's like the difference between the printed
> newsletter on the noticeboard and the Word document you type it in. The Studio
> is the Word document. Publish is pinning the new one up."

### 3 · Live: signing in (0:06)

**DO:** Go to `/studio`. Sign in with your email in front of them.

**SAY:** "Go to our website address and add `/studio` on the end. Sign in with
the email you were invited with. You'll only do this once on your own computer —
after that it remembers you. Everyone, do that now — I'll wait."

**DO:** Pause. Help anyone stuck. Get every person to the point where they can
see the list down the left-hand side.

### 4 · Live: the tour (0:10)

**DO:** Point at each item in the left menu as you describe it.

**SAY:** "Everything you can change is in this list on the left:
- **Homepage** — all the words and photos on the main page. See these tabs
  across the top? Hero, About, Meals, Fees… each tab is a section of the page.
- **Site settings** — our phone, email, address and opening hours.
- **Rooms** — our six rooms and their photos and descriptions.
- **Educators**, **Testimonials**, **FAQs** — exactly what they sound like.
- **Features** and **Trust bar** — the little highlight badges.

You don't need to memorise this. When you want to change something, you just
think 'where would that live?' and click it."

### 5 · Live: the three moves (0:15)

> This is the heart of the session. Everything else is a variation on these
> three moves. Go slowly.

**Move 1 — change words.**
**DO:** Open **Homepage → Hero**. Click into the Subheading. Change a word.
**SAY:** "Click the thing, click into the box, type. That's it. Notice it hasn't
changed on the real website yet — I'll come back to that."

**Move 2 — change a photo.**
**DO:** Still in Hero, click the **Main photo**. Upload or drag one in. Add alt
text.
**SAY:** "Click the picture, upload a new one. This box here — **alt text** —
type a few plain words describing the photo, like 'children playing in the
garden'. That's for families who use screen readers, and it helps Google. Always
fill it in."

**Move 3 — Publish.**
**DO:** Click the green **Publish** button, bottom-right.
**SAY:** "Here's the one that matters. Nothing you just did was live — it was a
private draft. The moment you click **Publish**, it goes to the real website,
and about a minute later everyone can see it. Let's watch."
**DO:** Switch to the live site tab, wait, refresh, show the change appear.

**SAY:** "Edit, publish, done. If you remember nothing else today, remember: it's
not live until you click Publish."

### 6 · Live: real recipes (0:23)

Do two or three of these end-to-end, narrating each click. Pick the ones the
team will actually use.

- **Update the phone number** → Site settings → Contact → edit → Publish.
- **Add a Google review** → Testimonials → **+ Create** → paste the quote, add
  the name and suburb → Publish.
- **Swap a room's photo** → Rooms → pick a room → click the photo → upload → add
  alt text → Publish.

**SAY:** "Every one of these is the same three moves you just learned. The `/guide`
page has all of these written out step by step, so you never have to remember —
you just look them up."

### 7 · Hands-on (0:30) — the part that makes it stick

**SAY:** "Your turn. Everyone, add a new testimonial — but **don't publish it.**
Click Testimonials, click + Create, type anything you like — 'Test from
[your name]' — and just leave it as a draft. This is completely safe: drafts are
never on the website."

**DO:** Walk the room. This is where people gain confidence. Celebrate the first
person who does it. Then show how to safely delete the practice draft
(⋮ menu → Delete).

**SAY:** "See? You just created something, and you deleted it, and the website
never even knew. That's how safe this is."

### 8 · Golden rules & the safety net (0:38)

**DO:** Put the "Golden rules" section of `/guide` on screen.

**SAY:** "Six things to keep in your back pocket:
1. **Nothing is live until you Publish.**
2. **Always add alt text** to photos.
3. **You can't lose work** — it auto-saves as a draft.
4. **You can't break the design** — only words and pictures.
5. **Made a mistake? Roll it back.** Open the item, ⋮ menu → *Review changes*,
   and restore an earlier version. Nothing is ever truly gone.
6. **Give it a minute** after publishing, then refresh."

**DO:** Actually demonstrate rule 5 — open the item you edited earlier and show
the version history. This is the single most reassuring thing you can show them.

### 9 · Help & wrap-up (0:41)

**SAY:** "Three things to take away. One: the editor is always at **/studio**.
Two: your step-by-step guide is always at **/guide** — bookmark it. Three: if
anything ever looks wrong, don't worry, save your draft instead of publishing,
and give me/the office a call. You've got this."

**DO:** Show them how to bookmark `/guide` and `/studio`. Open the floor for
questions.

---

## Questions they'll ask (and good answers)

**"What if I publish something wrong?"**
Open the item, use the ⋮ menu → *Review changes* to restore the previous
version, and publish that. Or just fix it and publish again — it's live within a
minute either way.

**"Will I break the website?"**
No. You only edit text and images. Layout, colours and fonts are locked. The
worst case is a typo that you can fix in thirty seconds.

**"How long until my change shows up?"**
About 60 seconds, then refresh the page. If it's set up with instant updates,
it's nearly immediate.

**"Do I need special software?"**
No — just a web browser on a laptop or desktop. It works on a tablet too, but a
computer is comfier for editing.

**"What's alt text and do I have to?"**
A short description of the photo, like "toddlers painting outside". It helps
vision-impaired families and Google. Please always add it — it takes five
seconds.

**"Can two of us edit at once?"**
Yes. Just avoid both editing the *exact same* thing at the same moment.

**"Where do photos come from / what makes a good one?"**
Use clear, well-lit, landscape photos. The site automatically resizes and
optimises them, so upload the best quality you have.

**"What can't I do here?"**
Fees estimates, enrolment forms and daily comms with families live in **OWNA**,
not here. This editor is for the public website — the shop window.

---

## Leave-behind (share these three links)

| What | Where | For |
| ---- | ----- | --- |
| The editor | `/studio` | Making changes |
| The friendly guide | `/guide` | Looking up how to do something |
| This script | `docs/CMS_TRAINING_PRESENTATION.md` | Whoever runs the next session |

---

## One-page cheat sheet (print or paste in the staff room)

**To change anything on the website:**
1. Go to **/studio** and sign in.
2. Click the thing on the left (Homepage, Site settings, Rooms, Educators,
   Testimonials, FAQs…).
3. **Words:** click the box and type. **Photos:** click the image, upload, add
   alt text.
4. Click **Publish** (bottom-right, green).
5. Wait ~1 minute, refresh the website. Done.

**Remember:** nothing is live until you Publish · you can't break it · every
change can be rolled back (⋮ → Review changes) · always add alt text to photos.

**Stuck?** Save your draft (don't publish) and call the office.
