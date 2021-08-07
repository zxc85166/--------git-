const app = Vue.createApp({
  data() {
    return {
      nurseshow: true,
      nurse2show: true,
      h1isShow: true,
      isShow: false,
      idx: 0,
      totalAnswer: "",
      selectedAnswer: "",
      randomHos: "",
      count: 4,
      questions: [
        {
          srcimg:
            "https://images.pexels.com/photos/112787/pexels-photo-112787.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
          question: "是否已滿18歲?",
          answers: { a: "是", b: "否" },
          // correctAnswer: "b",
        },
        {
          srcimg:
            "https://images.pexels.com/photos/7298867/pexels-photo-7298867.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
          question: "哪個部位不舒服?",
          answers: {
            a: "頭",
            b: "胸",
            c: "腹",
            d: "四肢",
          },
        },
        {
          srcimg:
            "https://images.pexels.com/photos/1576193/pexels-photo-1576193.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
          question: "接近哪個部位呢?",
          answers: {
            a: "臉",
            b: "喉",
          },
        },
        {
          srcimg:
            "https://images.pexels.com/photos/5938368/pexels-photo-5938368.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
          question: "疼痛四象限?",
          answers: {
            a: "肚子右上部位",
            b: "肚子左上部位",
            c: "肚子右下部位",
            d: "肚子左下部位",
          },
        },
      ],
    };
  },
  methods: {
    showgsap() {
      this.isShow = !this.isShow;
      this.h1isShow = !this.h1isShow;
      this.nurseshow = !this.nurseshow;
      this.nurse2show = !this.nurse2show;
    },
    answered(e) {
      this.selectedAnswer = e.target.value;
      const trd = this.idx.toString() + this.selectedAnswer;
      switch (trd) {
        case "3a":
          this.totalAnswer = "胃腸內科";
          break;
        case "3b":
          this.totalAnswer = "肝膽胰內科";
          break;
        case "3c":
          this.totalAnswer = "一般及消化系外科";
          break;
        case "3d":
          this.totalAnswer = "大腸直腸外科";
          break;
        default:
          this.totalAnswer = "";
      }
    },
    nextQuestion() {
      const status = this.idx.toString() + this.selectedAnswer;
      switch (status) {
        case "0b":
          this.totalAnswer = "小兒科、小兒眼科";
          this.idx += 4;
          break;
        case "1b":
          this.totalAnswer = "一般醫學外科、外傷及重症外科";
          this.idx += 3;
          break;
        case "1c":
          this.idx += 2;
          break;
        case "1d":
          this.totalAnswer = "整形外科、外傷及重症外科";
          this.idx += 3;
          break;
        case "2a":
          this.totalAnswer = "整形外科";
          this.idx += 3;
          break;
        case "2b":
          this.totalAnswer = "胸腔食道外科";
          this.idx += 3;
          break;
        default:
          this.idx++;
      }
      this.selectedAnswer = "";
      document.querySelectorAll("input").forEach((el) => (el.checked = false));
    },
    showResults() {
      this.idx++;
    },
    resetQuiz() {
      this.idx = 0;
      this.selectedAnswer = "";
      this.correctAnswers = 0;
      this.wrongAnswers = 0;
    },
  },
  mounted() {
    const hospital = [
      "高雄醫學大學附設中和紀念醫院",
      "國軍高雄總醫院",
      "榮民總醫院",
      "民生醫院",
      "大同醫院",
      "阮綜合醫院",
      "長庚紀念醫院",
    ];
    this.randomHos = hospital[Math.round(Math.random() * 6)];
    console.log(this.randomHos);
    const words = [
      "整形外科?",
      "胸腔食道外科?",
      "小兒外科?",
      "外傷及重症外科?",
      "一般醫學外科?",
      "胃腸內科?",
      "肝膽胰內科?",
      "大腸直腸外科?",
      "一般及消化系外科?",
      "過敏免疫風濕科?",
      "兒童眼科?",
    ];
    let cursor = gsap.timeline();
    cursor.from(".cursor", { opacity: 0, delay: 1.8 }).to(".cursor", {
      opacity: 0,
      ease: "power2.inOut",
      repeat: -1,
    });
    let masterTl = gsap.timeline({ repeat: -1 }).pause();
    let boxTl = gsap.timeline();
    boxTl
      .to(".box", {
        duration: 0,
        width: "17vw",
        delay: 0.5,
        ease: "power4.inOut",
      })
      .from(".hi", { duration: 1, y: "8vw", ease: "power3.out" })
      .to(".box", {
        duration: 1,
        height: "0vw",
        ease: "elastic.out",
        onComplete: () => masterTl.play(),
      })
      .to(".box", {
        duration: 2,
        autoAlpha: 0.7,
        yoyo: true,
        repeat: -1,
        ease: "rough({ template: none.out, strength:  1, points: 20, taper: 'none', randomize: true, clamp: false})",
      });
    words.forEach((word) => {
      let tl = gsap.timeline({ repeat: 1, yoyo: true, repeatDelay: 1 });
      tl.to(".text", { duration: 1, text: word });
      masterTl.add(tl);
    });
    const h2 = gsap.timeline({ defaults: { duration: 1 } });
    h2.from("h2.animh2", { opacity: 0, y: -50 });
    h2.from("button.animh3", { opacity: 0, y: -50 });
    gsap.from("img.nurse", { opacity: 0, duration: 1.5, x: -50 });
    gsap.from("img.nurse2", { opacity: 0, duration: 1.5, x: 50 });
  },
});

app.mount("#app");
