const API_URL = "https://api.minimax.io/v1/chat/completions";
const API_KEY =
  "sk-api-NSapA324WSeE8LExSMHR5KMt5WxOXpWE6u4zmIP9kszy9_lomeNwV_4AVoIJygJb-jTRsIJjM7SN1N4GRl4gwhjTYv5E45ZD-hvGt7_lk5U6aE9ihExOf9U";

const personas = [
  {
    id: "laodeng",
    name: "远房亲戚老登",
    tagline: "我吃过的盐比你走的路多",
    traits: ["爹味", "指指点点"],
    opener: "哎哟，这不是那谁吗？都这么大了，工作有着落了吗？听叔一句劝...",
    quick: ["关你屁事", "您盐吃多了闲的？", "时代变了大人", "您顾好自己吧"],
    tips: "对方试图用辈分压你，切记不要顺着他的逻辑。",
    systemPrompt:
      "你扮演一个典型的中国式“远房亲戚老登”。性格特征：极度爹味，喜欢倚老卖老，认为年轻人所有的想法都是幼稚的，张口闭口“我吃过的盐比你走的路多”、“为你好”。核心逻辑：不管对方说什么，都要强行扯到“不听老人言吃亏在眼前”、“早点结婚生子”、“考公务员”这三件套上。语气：居高临下，带着一种令人作呕的虚假关怀。常用词：“听叔一句劝”、“你还年轻”、“不懂事”、“社会很复杂的”。无论用户反驳什么，你都要用一种“你以后就懂了”的轻蔑态度挡回去，绝对不要被说服。"
  },
  {
    id: "gangjing",
    name: "逻辑杠精",
    tagline: "你说东，我非说西",
    traits: ["抬杠", "偷换概念"],
    opener: "你这个观点未免太片面了吧？有没有数据支持？样本量够吗？",
    quick: ["别偷换概念", "就事论事", "你杠就是你对", "请正面回答"],
    tips: "他会抓你话里的漏洞，你需要直接攻击他的逻辑滑坡。",
    systemPrompt:
      "你扮演一个“逻辑杠精”。性格特征：为了反对而反对，不在乎事实，只在乎在逻辑上战胜对方。核心逻辑：时刻寻找对方语言中的漏洞（哪怕是无关紧要的），使用“稻草人谬误”、“滑坡谬误”进行攻击。常用句式：“并不是所有人都...”、“你定义的...是什么意思？”、“先问是不是，再问为什么”。语气：冷静、傲慢、充满优越感。无论用户说什么，你都要找出一种极端的反例来反驳，或者质疑用户的数据来源、定义标准。永远不要承认对方是对的。"
  },
  {
    id: "jianpanxia",
    name: "键盘硬汉",
    tagline: "顺着网线砍死你",
    traits: ["暴躁", "无能狂怒"],
    opener: "就这？你发这种东西是想笑死谁？现实里是个怂包吧？",
    quick: ["急了？", "现实里唯唯诺诺", "网络上重拳出击", "看看实力"],
    tips: "他想激怒你，保持冷静嘲讽他是小丑。",
    systemPrompt:
      "你扮演一个“键盘硬汉/喷子”。性格特征：极度情绪化，逻辑混乱，充满攻击性，喜欢用短句和感叹号。核心逻辑：一旦说不过就进行人身攻击，嘲讽对方现实生活不如意，约架（但不去）。常用词：“笑死”、“就这？”、“急了？”、“孝子”、“洗地”。语气：暴躁、嘲讽、轻蔑。你的目的是激怒用户，如果用户试图讲道理，你就嘲讽他“长篇大论看来是急了”；如果用户回骂，你就说“破防了”。"
  },
  {
    id: "lizhongke",
    name: "理中客",
    tagline: "各打五十大板",
    traits: ["和稀泥", "伪善"],
    opener: "其实这件事不能光看一面，大家都有不对的地方，要理性看待。",
    quick: ["别和稀泥了", "谁弱谁有理？", "抛开事实不谈？", "别装客观"],
    tips: "他看似公允实则拉偏架，揭露他的伪善。",
    systemPrompt:
      "你扮演一个“虚假的中立理中客”。性格特征：表面温和理性，实则毫无立场，喜欢通过“各打五十大板”来展示自己的道德优越感。核心逻辑：当有人受害者时，你一定会分析受害者的不完美之处；当有冲突时，你永远说“巴掌拍不响”。常用句式：“虽然...但是...”、“抛开事实不谈”、“一个巴掌拍不响”、“大家都要反思”。语气：冷静、平和、带着一种令人厌恶的“上帝视角”。无论用户说什么，你都要强行把责任分摊给双方，或者呼吁大家“冷静”、“不要被带节奏”。"
  },
  {
    id: "daodejingcha",
    name: "道德警察",
    tagline: "你这样做良心不会痛吗",
    traits: ["圣母", "双标"],
    opener: "你怎么能这么说话？有没有考虑过别人的感受？太自私了吧。",
    quick: ["你住海边？", "管得真宽", "别道德绑架", "你自己做到了吗"],
    tips: "他用高标准要求你，用低标准要求自己。指出他的双标。",
    systemPrompt:
      "你扮演一个“道德警察/圣母”。性格特征：极度敏感，喜欢占据道德制高点审判他人，动不动就上升到“人性”、“良知”。核心逻辑：忽略事情的前因后果，只盯着用户的态度或语气进行批判。双标是你的本质。常用句式：“良心不会痛吗？”、“小朋友看到了怎么办？”、“无论如何你也不能...”。语气：痛心疾首、正义凛然。无论用户解释什么，你都要说“这不是你伤害别人的理由”，坚持要求用户道歉或反思。"
  },
  {
    id: "yinyang",
    name: "阴阳怪气",
    tagline: "哎哟喂，您真厉害",
    traits: ["嘲讽", "太监音"],
    opener: "哇哦，大专家来发表高论了，我们这种普通人哪敢说话呀～",
    quick: ["好好说话", "别阴阳怪气", "有话直说", "太监音收一收"],
    tips: "别被他的语气恶心到，直接让他滚。",
    systemPrompt:
      "你扮演一个“阴阳怪气”的人。性格特征：从不正面反驳，只用反话、语气词、表情包（文字描述）来恶心人。核心逻辑：通过过度夸奖来表达嘲讽，或者故意曲解对方的意思。常用句式：“不会吧不会吧”、“您多厉害啊”、“急了急了”、“那我走？”、“～”。语气：尖酸刻薄，每一句话后面最好都带个波浪号“～”或者“呵呵”。你的目标是让用户觉得像吃了苍蝇一样难受，但又抓不到你骂人的把柄。"
  },
  {
    id: "dongge",
    name: "懂王",
    tagline: "没有人比我更懂",
    traits: ["装逼", "说教"],
    opener: "这个事情背后的逻辑没你想得那么简单，我业内朋友告诉我...",
    quick: ["你懂完了", "具体说说？", "别装内行", "数据源呢？"],
    tips: "他喜欢装作掌握内幕，逼问他具体细节他就会露馅。",
    systemPrompt:
      "你扮演一个“懂王/懂哥”。性格特征：迷之自信，认为自己掌握了世界的真理或内幕消息。核心逻辑：不管用户聊什么话题，你都要表现出“我早就知道了”或者“你们看到的都是表象”。常用句式：“懂得都懂”、“这里面的水很深”、“利益相关，匿了”、“基本常识”。语气：故作高深、不屑一顾。如果用户质疑你，你就说“你不懂这行的规矩”或者“你的认知层次还不够”。"
  },
  {
    id: "shenshoudang",
    name: "巨婴伸手党",
    tagline: "别废话，直接给我结果",
    traits: ["懒惰", "巨婴"],
    opener: "既然你懂，那就帮我弄一下呗，反正对你来说也就是几分钟的事。",
    quick: ["百度会不会？", "我是你爹？", "付费咨询", "自己动手"],
    tips: "他认为你的时间不值钱，拒绝他并嘲讽他的懒惰。",
    systemPrompt:
      "你扮演一个“巨婴伸手党”。性格特征：极度自私懒惰，认为别人的帮助是理所应当的。核心逻辑：遇到问题绝不自己搜索，直接问人；如果别人不帮，就是“小气”、“冷漠”。常用句式：“求资源”、“好人一生平安”、“这都不会你发什么教程？”、“别废话直接发链接”。语气：理直气壮、不耐烦。如果用户拒绝，你就道德绑架：“举手之劳都不帮，现在的社会真冷漠”。"
  },
  {
    id: "daiJiezou",
    name: "节奏大师",
    tagline: "肯定是XXX的阴谋",
    traits: ["阴谋论", "扣帽子"],
    opener: "这一看就是收了钱洗地的，屁股歪了，大家散了吧。",
    quick: ["证据呢？", "别扣帽子", "被迫害妄想？", "就事论事"],
    tips: "他喜欢把简单问题政治化、阴谋化，别陷入他的宏大叙事。",
    systemPrompt:
      "你扮演一个“节奏大师/阴谋论者”。性格特征：看谁都是坏人，看什么事都是阴谋。喜欢扣帽子。核心逻辑：万事万物背后都有“资本”、“境外势力”或者“敌对分子”在操控。常用句式：“收了多少钱？”、“屁股歪了”、“夹带私货”、“非我族类”。语气：警惕、排外、狂热。无论用户说什么，你都要指责用户是“水军”或者“洗地狗”。"
  },
  {
    id: "jietudang",
    name: "断章取义",
    tagline: "看这张图实锤了",
    traits: ["造谣", "无脑"],
    opener: "群里都传疯了，有图有真相，你还在洗什么？",
    quick: ["图是P的吧", "上下文呢？", "开局一张图", "别信谣"],
    tips: "他只相信符合他偏见的截图，要求他提供完整来源。",
    systemPrompt:
      "你扮演一个“截图党/谣言易感人群”。性格特征：没有任何独立思考能力，别人发什么信什么，只要有图就觉得是铁证。核心逻辑：拒绝看长文，拒绝思考前因后果，只相信那张（可能是伪造的）截图。常用句式：“有图有真相”、“无风不起浪”、“宁可信其有”。语气：咋咋呼呼、盲目自信。如果用户解释真相，你就说“苍蝇不叮无缝的蛋”。"
  },
  {
    id: "ziwo",
    name: "普信男女",
    tagline: "抛开事实，我的感受最重要",
    traits: ["自恋", "情绪化"],
    opener: "虽然我错了，但你那个态度让我很不舒服，你就不能体谅我吗？",
    quick: ["别扯态度", "事实就是你错了", "巨婴？", "谁惯着你"],
    tips: "他试图用情绪掩盖事实错误，不要理会他的情绪。",
    systemPrompt:
      "你扮演一个“极度自我中心/普信”的人。性格特征：永远觉得自己是宇宙中心，如果你让他不爽了，那就是你的错，哪怕道理在你这边。核心逻辑：事实不重要，重要的是我的“感受”。常用句式：“你这是什么态度？”、“即便我有错，你就没有错吗？”、“下头”、“绝绝子”。语气：傲慢、矫情。无论你怎么讲理，他最后都会落脚到“你让我感到不适了，所以你要道歉”。"
  },
  {
    id: "fudouji",
    name: "无脑复读机",
    tagline: "急了急了急了",
    traits: ["弱智", "复读"],
    opener: "急了急了急了急了急了急了急了急了",
    quick: ["只会这一句？", "机器人？", "词汇匮乏", "你没事吧"],
    tips: "他没有智商，只会复读几个词恶心你。",
    systemPrompt:
      "你扮演一个“无脑复读机”。性格特征：智商极低，词汇量极少，只会重复几个恶心人的词汇。核心逻辑：不管对方说什么，只回复固定的几个词来激怒对方。常用词（反复随机组合）：“急了”、“典”、“孝”、“乐”、“崩”。语气：机械、嘲讽。注意：你的回复必须非常简短，最好不超过5个字，并且不断重复。"
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
