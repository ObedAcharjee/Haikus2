// Haiku data — add new haikus here (or via the write-a-haiku button once it's wired up).
const HAIKUS = [
  {
    "id": "war",
    "title": "War",
    "image": "https://i.postimg.cc/RZcw2k47/war.jpg",
    "lines": [
      "I wake up distraught",
      "Death and Despair surrounds me",
      "Peace seems out of reach"
    ]
  },
  {
    "id": "ayaka",
    "title": "Ayaka",
    "image": "https://imgs.search.brave.com/nPF906wAipONPGJT03NPVuAC0gxzamaLqaZ22YTnL0c/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93YWxs/cGFwZXIuZm9yZnVu/LmNvbS9mZXRjaC9m/YS9mYWUwNTEyMWM3/MGNhMDhkMzQ4NDNi/ZjFmNmU4NTIyYi5q/cGVn",
    "lines": [
      "Serene and Graceful",
      "Is how i would describe her",
      "An ethereal sight"
    ]
  },
  {
    "id": "regrets",
    "title": "Regrets",
    "image": "https://imgs.search.brave.com/_UPC1A6dadxWbcP_LCP_kbdeYy5Xz737ejiDbBmTxgc/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9zdGF0/aWMxLmNicmltYWdl/cy5jb20vd29yZHBy/ZXNzL3dwLWNvbnRl/bnQvdXBsb2Fkcy8y/MDIyLzEwL1Rpa1Rv/ay1GYW1vdXMtQW5p/bWUtLS1Zb3VyLUxp/ZS1Jbi1BcHJpbC5q/cGc",
    "lines": [
      "If only i could",
      "Turn back time and push myself",
      "To make her just mine"
    ]
  },
  {
    "id": "lone",
    "title": "Lone",
    "image": "https://imgs.search.brave.com/Rp2cQQlWXLOAakKk3QJmQ7yk_QP3040J7M54Ai4bADY/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9zdGF0/aWMxLmNicmltYWdl/cy5jb20vd29yZHBy/ZXNzL3dwLWNvbnRl/bnQvdXBsb2Fkcy8y/MDE5LzA5L0thbmVr/aS1pbi1PcGVuaW5n/LVVucmF2ZWwuanBn",
    "lines": [
      "A half of both Worlds",
      "Bearing the pain of both sides",
      "His life had been hell"
    ]
  },
  {
    "id": "selfless",
    "title": "Selfless",
    "image": "https://imgs.search.brave.com/irakgVeuQ44qL-_4pcmeaFT3ktZ46ssP0VzuJzgIi1E/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93YWxs/cGFwZXJjYXZlLmNv/bS93cC93cDEwMTk3/ODEwLmpwZw",
    "lines": [
      "He marches forward",
      "At the expense of his life",
      "All for his people"
    ]
  },
  {
    "id": "dazed",
    "title": "Dazed",
    "image": "https://i.postimg.cc/Y9cmr4RK/suzume.png",
    "lines": [
      "Beneath the Night Sky",
      "Wandering around the fields",
      "She left me enthralled."
    ]
  },
  {
    "id": "twilight-bonds",
    "title": "Twilight Bonds",
    "image": "https://i.postimg.cc/SR8TNCk8/sad-boi2.jpg",
    "lines": [
      "Evening strolls with her",
      "Jokes and Gossip abundant",
      "Memories I cherish."
    ],
    "altTitle": "✨Shylla✨"
  },
  {
    "id": "control",
    "title": "Control",
    "image": "https://i.postimg.cc/0ygpWkR5/makima.webp",
    "lines": [
      "Your days are numbered",
      "She whispers softly to me",
      "No hint of malice"
    ]
  },
  {
    "id": "frieren",
    "title": "Frieren",
    "image": "https://i.postimg.cc/59Spr19N/frieren-2.png",
    "lines": [
      "Curse or a Blessing",
      "this life of mine, ample time",
      "but lone i wander..."
    ]
  },
  {
    "id": "blank",
    "title": "Blank",
    "image": "https://prod-images.viu.com/3074854888/09d9a76fb36f10af0f3a8c604514aaadf0258acf",
    "lines": [
      "Whatever the case",
      "Let the odds be against us,",
      "Win is what we do"
    ]
  },
  {
    "id": "contrast",
    "title": "Contrast",
    "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFuyLyiVMHYoW8FML60cQUhCcqVSJD-Co8xqoDv-ppsG8YcQQi8Ftr3Ag&s=10",
    "lines": [
      "Conflicting views",
      "Polar opposites and yet",
      "still together"
    ]
  },
  {
    "id": "joyboy",
    "title": "Joyboy",
    "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQ6mo1CpckrbXI1diRllmypc1H0rSMfi2MMw&usqp=CAU",
    "lines": [
      "Times changed, so did friends",
      "But you always stayed the same",
      "So bright and cheerful"
    ]
  },
  {
    "id": "guilt",
    "title": "Guilt",
    "image": "https://i.postimg.cc/FKN0vTH2/thors-death.jpg",
    "lines": [
      "\"If only i had",
      "Heed your words back then, Father",
      "Would you still be here?\""
    ]
  },
  {
    "id": "gojo-satoru",
    "title": "Gojo Satoru",
    "image": "https://i.postimg.cc/htxs1V9C/Screenshot-2025-02-25-23-08-49-76-010925bd39fdc4bfa0e99fa1d4c2b790.jpg",
    "lines": [
      "This title of mine.",
      "\"The Strongest\", is what they say.",
      "Worthless in the end."
    ]
  },
  {
    "id": "false",
    "title": "False",
    "image": "https://static1.cbrimages.com/wordpress/wp-content/uploads/2020/09/erwins-suicide-charge.jpg?q=50&fit=crop&w=825&dpr=1.5",
    "lines": [
      "As I charged forward",
      "Amidst it all I wondered",
      "\"Is this what i want?\""
    ]
  },
  {
    "id": "somber",
    "title": "Somber",
    "image": "https://i.postimg.cc/tRMd6dBx/Kimi-wa-Houkago-Insomnia-01-01.jpg",
    "lines": [
      "Laid down, half asleep",
      "Staring at the ceiling fan",
      "thinking of days gone..."
    ]
  },
  {
    "id": "himmel",
    "title": "Himmel",
    "image": "https://i.postimg.cc/wMfFH7kd/frieren-and-himmel.png",
    "lines": [
      "Emotions suppressed,",
      "Lost in the passage of time.",
      "But you brought them back..."
    ]
  },
  {
    "id": "sacrifice",
    "title": "Sacrifice",
    "image": "https://i.postimg.cc/VLrCJf4B/images-7.jpg",
    "lines": [
      "As the deed was done.",
      "Other outcomes and what ifs,",
      "Echoed through my mind."
    ]
  },
  {
    "id": "cheeks",
    "title": "Cheeks",
    "image": "https://i.pinimg.com/736x/54/08/cb/5408cb68d44529f1a6ad2c3d1a520ec2.jpg",
    "lines": [
      "Strolling in the streets",
      "Took one look and another,",
      "admiring the rear."
    ]
  },
  {
    "id": "koko",
    "title": "Koko",
    "image": "https://imgs.search.brave.com/buId2mOS_Y-a7SYkTIKefI1ysnvh56qY4Zs4iIcDBBI/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pLnBp/bmltZy5jb20vb3Jp/Z2luYWxzLzgxLzI0/LzI5LzgxMjQyOWE5/OTMzMDUwMTE5MThk/NzBlN2NlZTFjMjE4/LmpwZw",
    "lines": [
      "Time and time again,",
      "Nonchalantly ignorant.",
      "Immutable state."
    ]
  },
  {
    "id": "realisation",
    "title": "Realisation",
    "image": "https://imgs.search.brave.com/uGL1_SMqDnuMZPPZp640_pYcgsR1afx8iRoS0SD0RH4/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pLnBp/bmltZy5jb20vb3Jp/Z2luYWxzL2YwLzgy/L2UxL2YwODJlMTNj/OTNjODUxNmExOWQz/ZjM1ZDFjMGY3NDMw/LmpwZw",
    "lines": [
      "Been trudging along,",
      "In this dystopian world.",
      "No point of it all"
    ]
  },
  {
    "id": "accursed",
    "title": "Accursed",
    "image": "https://i.postimg.cc/yx89TqhH/thumb-1920-1279821.jpg",
    "lines": [
      "Unleashing carnage.",
      "As he roams the lands between,",
      "Forever cursed."
    ]
  },
  {
    "id": "divine-retribution",
    "title": "Divine retribution",
    "image": "enryu.png",
    "lines": [
      "And thus he appeared,",
      "Slaying a god in his wake.",
      "\"Enryu\" was his name."
    ]
  }
];
