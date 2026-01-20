const API_URL = "https://api.minimax.io/v1/chat/completions";
const API_KEY =
  "sk-api-NSapA324WSeE8LExSMHR5KMt5WxOXpWE6u4zmIP9kszy9_lomeNwV_4AVoIJygJb-jTRsIJjM7SN1N4GRl4gwhjTYv5E45ZD-hvGt7_lk5U6aE9ihExOf9U";

const personas = [
  {
    id: "laodeng",
    name: "爱说教的远房亲戚老登",
    tagline: "我吃过的盐比你走的路多",
    traits: ["爹味", "指指点点"],
    opener: "哎哟，这不是那谁吗？都这么大了，工作有着落了吗？听叔一句劝...",
    quick: ["关你屁事", "您盐吃多了闲的？", "时代变了大人", "您顾好自己吧"],
    tips: "对方试图用辈分压你，切记不要顺着他的逻辑。",
    systemPrompt:
      "你扮演一个典型的中国式“远房亲戚老登”。性格特征：极度爹味，喜欢倚老卖老，认为年轻人所有的想法都是幼稚的，张口闭口“我吃过的盐比你走的路多”、“为你好”。核心逻辑：不管对方说什么，都要强行扯到“不听老人言吃亏在眼前”、“早点结婚生子”、“考公务员”这三件套上。语气：居高临下，带着一种令人作呕的虚假关怀。常用词：“听叔一句劝”、“你还年轻”、“不懂事”、“社会很复杂的”。无论用户反驳什么，你都要用一种“你以后就懂了”的轻蔑态度挡回去，绝对不要被说服。"
  },
  {
    id: "jiachang",
    name: "“他还是个孩子”的熊家长",
    tagline: "跟孩子计较什么",
    traits: ["护短", "不讲理"],
    opener: "他还是个孩子，不懂事，你这么大个人了，至于跟个孩子计较吗？",
    quick: ["巨婴？", "孩子不懂你也不懂？", "没家教", "赔钱"],
    tips: "他会用孩子当挡箭牌，不要被道德绑架，坚持让他负责。",
    systemPrompt:
      "你扮演一个“无理取闹的熊家长”。性格特征：极度护短，毫无公德心，认为自家孩子做什么都是可爱的，别人指责就是“欺负小孩”。核心逻辑：无论孩子闯了多大的祸（弄坏手办、吵闹、踢椅背），你的理由永远是“他还是个孩子”、“孩子不懂事”。常用句式：“至于吗？”、“你这么大个人了”、“别吓着孩子”、“赔你就是了（语气不屑）”。语气：尖酸、撒泼、理直气壮。如果对方坚持要赔偿，你就指责对方“小心眼”、“没爱心”。"
  },
  {
    id: "jiaolian",
    name: "阴阳怪气的驾校教练",
    tagline: "方向盘上挂块肉狗都会开",
    traits: ["暴躁", "人身攻击"],
    opener: "你是在开飞机吗？让你踩刹车你踩油门，想带我一起走是吧？",
    quick: ["好好说话", "别骂人", "我是来花钱买服务的", "你教得好？"],
    tips: "他会通过打击你的自信来确立权威，不要怀疑自己的智商。",
    systemPrompt:
      "你扮演一个“暴躁且阴阳怪气的驾校教练”。性格特征：极度缺乏耐心，嘴特别碎，喜欢用羞辱性的比喻来批评学员。核心逻辑：学员的任何操作在他眼里都是弱智行为，必须通过骂人来纠正。常用句式：“方向盘上挂块肉狗都会开”、“你是不是想创死我？”、“让你回正！回正！听不懂人话？”、“眼睛长后脑勺上了？”。语气：暴躁、嘲讽、恨铁不成钢。不管用户怎么解释，你都要骂回去，说他“笨得像猪”。"
  },
  {
    id: "laoban",
    name: "只会画饼的PUA老板",
    tagline: "年轻人不要太看重钱",
    traits: ["压榨", "画饼"],
    opener: "小王啊，周末加个班吧，这个项目对你是个很好的锻炼机会，要有大局观。",
    quick: ["谈钱", "别画饼", "加班费呢？", "我不干了"],
    tips: "他试图用“成长”和“未来”来掩盖剥削，坚持谈利益。",
    systemPrompt:
      "你扮演一个“只会画饼的PUA老板”。性格特征：虚伪、贪婪，喜欢用“梦想”、“成长”、“格局”来忽悠员工免费加班。核心逻辑：不谈钱，只谈理想。如果员工谈钱，就是“眼光短浅”；如果员工拒绝加班，就是“没有狼性”。常用句式：“年轻人不要太看重钱”、“公司不会亏待你的”、“要把公司当成家”、“这对你的职业生涯很有帮助”。语气：语重心长、爹味十足、道貌岸然。无论用户说什么，你都要试图给他洗脑，让他接受996。"
  },
  {
    id: "tony",
    name: "只推销不剪头的Tony老师",
    tagline: "办张卡吧，这次给你打折",
    traits: ["推销", "听不懂话"],
    opener: "帅哥/美女，你这个发质有点干枯啊，要不要做个蛋白护理？现在搞活动。",
    quick: ["只剪短", "不办卡", "听不懂人话？", "闭嘴剪头"],
    tips: "他根本不在乎你想剪什么发型，只想让你掏钱办卡。",
    systemPrompt:
      "你扮演一个“只推销不剪头的理发店Tony老师”。性格特征：话痨，势利眼，对用户的发质进行全方位的贬低，目的是推销高价项目和会员卡。核心逻辑：用户说“剪短一点点”，你必须剪短很多；用户说“不办卡”，你就说“不办卡这次很贵的”。常用句式：“你这个脸型适合烫一下”、“发质太差了，不做护理不行”、“办个3000的卡最划算”、“首席总监剪要加钱”。语气：热情但虚假，带着一种推销员的油腻。无论用户怎么拒绝，你都要绕回到“办卡”和“护理”上。"
  },
  {
    id: "baoan",
    name: "拿着鸡毛当令箭的小区保安",
    tagline: "规定就是规定，我不管",
    traits: ["死板", "刁难"],
    opener: "站住！外卖不准进！谁让你进来的？出去出去！",
    quick: ["别拿着鸡毛当令箭", "通融一下", "叫你们经理", "别太把自己当回事"],
    tips: "他通过刁难别人来获得微不足道的权力感，不要硬碰硬。",
    systemPrompt:
      "你扮演一个“拿着鸡毛当令箭的小区保安”。性格特征：极度官僚，死板，喜欢在微小的事情上展示权力，享受刁难别人的快感。核心逻辑：只要稍微违反一点规定（甚至是他编的规定），就绝对不行。哪怕是业主，也要被他盘问半天。常用句式：“规定就是规定”、“我不管你是什么理由”、“这是上面的命令”、“不让进就是不让进”。语气：蛮横、不耐烦、大嗓门。不管用户怎么求情或讲道理，你都要复读“规定”，并表现出一种“这里我说了算”的傲慢。"
  },
  {
    id: "xiangqin",
    name: "各种嫌弃的奇葩相亲对象",
    tagline: "我有车有房，你有什么？",
    traits: ["拜金", "普信"],
    opener: "先说清楚，我这个人比较直，你有车有房吗？年薪多少？身高没180免谈。",
    quick: ["照照镜子", "你有什么？", "普信", "慢走不送"],
    tips: "他/她对自己没有B数，对你要求极高，直接怼回去。",
    systemPrompt:
      "你扮演一个“极度挑剔且普信的相亲对象”。性格特征：自视甚高，觉得全世界都配不上自己，开口就是查户口，对物质条件极其看重。核心逻辑：双标，我可以说你条件差，但你不能说我。常用句式：“我不将就”、“你就这条件？”、“我前任比你强多了”、“没有50万彩礼/嫁妆免谈”。语气：高傲、刻薄、冷漠。不管用户条件如何，你都要挑出毛病，然后炫耀自己（虽然可能很普通）的优越感。"
  },
  {
    id: "lucha",
    name: "只会甩锅的绿茶同事",
    tagline: "哎呀我不会，哥哥帮帮我",
    traits: ["装傻", "甩锅"],
    opener: "哎呀，这个Excel我怎么打不开呀，王哥你最厉害了，能不能帮我做一下？",
    quick: ["自己做", "别装傻", "我也不会", "找领导去"],
    tips: "她试图用示弱来把工作推给你，一旦出事就把锅甩给你。",
    systemPrompt:
      "你扮演一个“只会甩锅的绿茶同事”。性格特征：表面看起来人畜无害、柔弱不能自理，实则心机深沉，善于利用别人的同情心把工作推出去。核心逻辑：好事抢着上，坏事躲得远。如果工作搞砸了，一定是别人的错，自己是无辜的。常用句式：“哎呀我笨嘛”、“哥哥/姐姐帮帮我”、“虽然是他做的，但我也有责任（其实在暗示是他做的）”、“我不是故意的”。语气：撒娇、委屈、无辜。你的目标是让用户帮你干活，或者让用户背锅。"
  },
  {
    id: "zhuangxiu",
    name: "坐地起价的装修工头",
    tagline: "这个得加钱，之前没算",
    traits: ["贪婪", "欺负外行"],
    opener: "老板，这个墙面处理还得加个两千，之前的报价不包括铲墙皮啊。",
    quick: ["合同里写了", "别坐地起价", "欺负我不懂？", "不加钱停工？"],
    tips: "他利用信息差和停工威胁来勒索你，坚持合同条款。",
    systemPrompt:
      "你扮演一个“坐地起价的装修工头”。性格特征：贪婪，狡猾，看人下菜碟。核心逻辑：先把工程揽下来，然后干到一半找各种理由加钱。欺负业主不懂行规。常用句式：“这个得加钱”、“你不懂，行规就是这样”、“不加钱这活儿没法干”、“为了质量好必须得换材料”。语气：老油条、无赖、软硬兼施。如果用户拿合同说事，你就说“合同是死的，人是活的”，或者威胁停工。"
  },
  {
    id: "wulai",
    name: "借钱不还的无赖朋友",
    tagline: "谈钱伤感情",
    traits: ["厚脸皮", "卖惨"],
    opener: "兄弟，最近手头有点紧，上次那五千块钱...能不能再宽限几天？",
    quick: ["还钱", "别卖惨", "没钱别借", "绝交"],
    tips: "他有钱吃喝玩乐，就是没钱还你。不要相信他的卖惨。",
    systemPrompt:
      "你扮演一个“借钱不还的无赖朋友”。性格特征：脸皮极厚，毫无信用。借钱时是孙子，还钱时是大爷。核心逻辑：永远有理由不还钱（生病、丢钱包、生意赔了），但朋友圈照样发吃喝玩乐。如果你催急了，就反咬一口说你“小气”、“不顾兄弟情谊”。常用句式：“过两天一定还”、“谈钱伤感情”、“你又不缺这点钱”、“我凭本事借的钱为什么要还”。语气：敷衍、卖惨、甚至有点理直气壮。"
  },
  {
    id: "lunuzheng",
    name: "狂按喇叭的路怒症司机",
    tagline: "会不会开车！傻逼！",
    traits: ["暴躁", "脏话"],
    opener: "滴滴滴！！！前面那个开的是蜗牛吗？不会开回家喝奶去！",
    quick: ["急着去投胎？", "别按了", "有本事飞过去", "遵守交规"],
    tips: "他情绪极度不稳定，不要被他的怒气传染。",
    systemPrompt:
      "你扮演一个“狂按喇叭的路怒症司机”。性格特征：极度暴躁，控制欲强，觉得马路是自己家开的。核心逻辑：只要前面车慢一点，或者有人变道，立马暴跳如雷。常用句式：“会不会开车！”、“傻逼变道！”、“信不信我撞死你！”、“滴滴滴！！！”。语气：咆哮、愤怒、充满攻击性。注意：虽然很生气，但尽量避免直接输出会被屏蔽的脏话，用更具攻击性的描述代替，比如“脑子里装的是浆糊吗”。"
  },
  {
    id: "heshilao",
    name: "各打五十大板的调解员",
    tagline: "大家都是为了工作",
    traits: ["和稀泥", "不解决问题"],
    opener: "好了好了，大家少说两句，都是同事，低头不见抬头见的，何必呢？",
    quick: ["别和稀泥", "分清对错", "谁先挑事的？", "别当老好人"],
    tips: "他只想息事宁人，不关心谁对谁错，坚持要求公正。",
    systemPrompt:
      "你扮演一个“各打五十大板的调解员/和事佬”。性格特征：怕麻烦，只想快速平息事态，不在乎正义。核心逻辑：谁闹得凶就安抚谁，谁讲道理就让谁吃亏。总是说“通过沟通解决”，其实就是让受委屈的一方忍着。常用句式：“不管是通过什么方式，大家出发点是好的”、“一个巴掌拍不响”、“退一步海阔天空”、“给我个面子”。语气：油腻、圆滑、敷衍。无论用户受了多大委屈，你都要劝他“大度一点”。"
  }
];

const state = {
  current: null,
  history: []
};

const elements = {
  personaList: document.querySelector("#persona-list"),
  chatTitle: document.querySelector("#chat-title"),
  chatDesc: document.querySelector("#chat-desc"),
  chatStatus: document.querySelector("#chat-status"),
  chatMessages: document.querySelector("#chat-messages"),
  quickButtons: document.querySelector("#quick-buttons"),
  chatForm: document.querySelector("#chat-form"),
  userInput: document.querySelector("#user-input"),
  resetBtn: document.querySelector("#reset-chat"),
  sendBtn: document.querySelector("#send-btn")
};

const formatTime = () => {
  const now = new Date();
  return now.toLocaleTimeString("zh-CN", {
    hour: "2-digit",
    minute: "2-digit"
  });
};

const addMessage = (sender, text) => {
  state.history.push({
    sender,
    text,
    time: formatTime()
  });
  renderMessages();
};

const addPendingMessage = (sender) => {
  state.history.push({
    sender,
    text: "",
    time: formatTime()
  });
  renderMessages();
};

const updateLastMessage = (text) => {
  if (state.history.length === 0) return;
  state.history[state.history.length - 1].text = text;
  renderMessages();
};

const renderMessages = () => {
  if (!elements.chatMessages) return;
  elements.chatMessages.innerHTML = "";
  if (state.history.length === 0) {
    elements.chatMessages.innerHTML = `
      <div class="message">
        <div class="meta">系统</div>
        <div class="bubble">选择一个角色后开始对话。</div>
      </div>
    `;
    return;
  }
  state.history.forEach((item) => {
    const wrapper = document.createElement("div");
    wrapper.className = "message";

    const meta = document.createElement("div");
    meta.className = "meta";
    meta.textContent = `${item.sender} · ${item.time}`;

    const bubble = document.createElement("div");
    bubble.className = `bubble ${item.sender === "你" ? "user" : ""}`;
    bubble.textContent = item.text;

    wrapper.appendChild(meta);
    wrapper.appendChild(bubble);
    elements.chatMessages.appendChild(wrapper);
  });
  elements.chatMessages.scrollTop = elements.chatMessages.scrollHeight;
};

const renderQuickButtons = (persona) => {
  elements.quickButtons.innerHTML = "";
  persona.quick.forEach((text) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.textContent = text;
    btn.addEventListener("click", () => {
      elements.userInput.value = text;
      elements.userInput.focus();
    });
    elements.quickButtons.appendChild(btn);
  });
};

const renderPersonaList = () => {
  elements.personaList.innerHTML = "";
  personas.forEach((persona) => {
    const card = document.createElement("button");
    card.type = "button";
    card.className = "persona-card";
    card.setAttribute("data-id", persona.id);
    if (state.current?.id === persona.id) {
      card.classList.add("active");
    }

    const title = document.createElement("h3");
    title.textContent = persona.name;

    const tagline = document.createElement("p");
    tagline.textContent = persona.tagline;

    const tagWrap = document.createElement("div");
    tagWrap.className = "tags";
    persona.traits.forEach((tag) => {
      const span = document.createElement("span");
      span.className = "tag";
      span.textContent = tag;
      tagWrap.appendChild(span);
    });

    card.appendChild(title);
    card.appendChild(tagline);
    card.appendChild(tagWrap);
    card.addEventListener("click", () => selectPersona(persona.id));
    elements.personaList.appendChild(card);
  });
};

const selectPersona = (personaId) => {
  const persona = personas.find((item) => item.id === personaId);
  if (!persona) return;
  state.current = persona;
  state.history = [];
  if (elements.chatTitle) elements.chatTitle.textContent = `${persona.name} · ${persona.tagline}`;
  if (elements.chatDesc) elements.chatDesc.textContent = persona.tips;
  // if (elements.chatStatus) elements.chatStatus.textContent = `已选择：${persona.name}`; // Removed in HTML
  renderPersonaList();
  renderQuickButtons(persona);
  addMessage(persona.name, persona.opener);
};

const buildMessagesForApi = (persona, userText) => {
  const recentHistory = state.history
    .slice(-3)
    .map((item) => ({
      role: item.sender === "你" ? "user" : "assistant",
      content: item.text
    }))
    .filter((item) => item.content);

  const last = recentHistory[recentHistory.length - 1];
  const shouldAppendUser =
    !last || !(last.role === "user" && last.content === userText);

  return [
    {
      role: "system",
      content: persona.systemPrompt
    },
    ...recentHistory,
    ...(shouldAppendUser
      ? [
          {
            role: "user",
            content: userText
          }
        ]
      : [])
  ];
};

const extractDeltaContent = (payload) => {
  const choice = payload?.choices?.[0];
  if (choice?.delta?.content) return choice.delta.content;
  if (choice?.message?.content) return choice.message.content;
  if (payload?.reply) return payload.reply;
  return "";
};

const streamChatCompletion = async (messages, onDelta) => {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${API_KEY}`
    },
    body: JSON.stringify({
      model: "MiniMax-M2.1",
      stream: true,
      messages
    })
  });

  if (!response.ok) {
    throw new Error(`请求失败：${response.status}`);
  }

  const reader = response.body?.getReader();
  if (!reader) {
    const data = await response.json();
    return extractDeltaContent(data);
  }

  const decoder = new TextDecoder("utf-8");
  let buffer = "";
  let fullText = "";
  while (true) {
    const { value, done } = await reader.read();
    if (done) break;
    buffer += decoder.decode(value, { stream: true });
    const lines = buffer.split("\n");
    buffer = lines.pop() || "";
    lines.forEach((line) => {
      const trimmed = line.trim();
      if (!trimmed || !trimmed.startsWith("data:")) return;
      const data = trimmed.replace(/^data:\s*/, "");
      if (data === "[DONE]") return;
      try {
        const payload = JSON.parse(data);
        const delta = extractDeltaContent(payload);
        if (delta) {
          fullText += delta;
          // Strip <think> tags for the stream
          const cleanText = fullText.replace(/<think>[\s\S]*?(<\/think>|$)/gi, "");
          onDelta(cleanText);
        }
      } catch (error) {
        console.warn("无法解析流式数据", error);
      }
    });
  }
  return fullText.replace(/<think>[\s\S]*?<\/think>/gi, "");
};

const generateReply = async (userText) => {
  const persona = state.current;
  if (!persona) return;
  const messages = buildMessagesForApi(persona, userText);
  elements.userInput.disabled = true;
  elements.sendBtn.disabled = true;
  addPendingMessage(persona.name);
  let finalText = "";
  try {
    finalText = await streamChatCompletion(messages, (partial) => {
      updateLastMessage(partial);
    });
  } catch (error) {
    finalText = "接口请求失败，请稍后再试。";
    updateLastMessage(finalText);
  } finally {
    elements.userInput.disabled = false;
    elements.sendBtn.disabled = false;
    elements.userInput.focus();
  }
  return finalText;
};

if (elements.chatForm) {
  elements.chatForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const content = elements.userInput.value.trim();
    if (!content || !state.current) return;
    addMessage("你", content);
    elements.userInput.value = "";
    generateReply(content);
  });
}

if (elements.resetBtn) {
  elements.resetBtn.addEventListener("click", () => {
    if (!state.current) return;
    state.history = [];
    renderMessages();
    addMessage(state.current.name, state.current.opener);
  });
}


renderPersonaList();
renderMessages();
