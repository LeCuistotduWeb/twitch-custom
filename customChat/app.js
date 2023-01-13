const tchat = document.querySelector("#chat");

window.addEventListener("onEventReceived", function (obj) {
  if (obj.detail.event.listener === "widget-button") {
    if (obj.detail.event.field === "testMessage") {
      let emulated = new CustomEvent("onEventReceived", {
        detail: {
          listener: "message",
          event: {
            service: "twitch",
            data: {
              time: Date.now(),
              tags: {
                "badge-info": "",
                badges: "moderator/1,partner/1",
                color: "#5B99FF",
                "display-name": "StreamElements",
                emotes: "25:46-50",
                flags: "",
                id: "43285909-412c-4eee-b80d-89f72ba53142",
                mod: "1",
                "room-id": "85827806",
                subscriber: "0",
                "tmi-sent-ts": "1579444549265",
                turbo: "0",
                "user-id": "100135110",
                "user-type": "mod",
              },
              nick: "lecuistotduweb",
              userId: "100135110",
              displayName: "lecuistotduweb",
              displayColor: "#5B99FF",
              badges: [
                {
                  type: "moderator",
                  version: "1",
                  url: "https://static-cdn.jtvnw.net/badges/v1/3267646d-33f0-4b17-b3df-f923a41db1d0/3",
                  description: "Moderator",
                },
                {
                  type: "partner",
                  version: "1",
                  url: "https://static-cdn.jtvnw.net/badges/v1/d12a2e27-16f6-41d0-ab77-b780518f00a3/3",
                  description: "Verified",
                },
              ],
              channel: "lecuistotduweb",
              text: "Howdy! My name is Bill and I am here to serve Kappa",
              isAction: !1,
              emotes: [
                {
                  type: "twitch",
                  name: "Kappa",
                  id: "25",
                  gif: !1,
                  urls: {
                    1: "https://static-cdn.jtvnw.net/emoticons/v1/25/1.0",
                    2: "https://static-cdn.jtvnw.net/emoticons/v1/25/1.0",
                    4: "https://static-cdn.jtvnw.net/emoticons/v1/25/3.0",
                  },
                  start: 46,
                  end: 50,
                },
              ],
              msgId: "43285909-412c-4eee-b80d-89f72ba53142",
            },
            renderedText:
              'Howdy! My name is Bill and I am here to serve <img src="https://static-cdn.jtvnw.net/emoticons/v1/25/1.0" srcset="https://static-cdn.jtvnw.net/emoticons/v1/25/1.0 1x, https://static-cdn.jtvnw.net/emoticons/v1/25/1.0 2x, https://static-cdn.jtvnw.net/emoticons/v1/25/3.0 4x" title="Kappa" class="emote">',
          },
        },
      });
      window.dispatchEvent(emulated);
    }
    return;
  }
  if (obj.detail.listener === "delete-message") {
    const msgId = obj.detail.event.msgId;
    document.querySelector(`#message-${msgId}]`).forEach((el) => el.remove());
    return;
  } else if (obj.detail.listener === "delete-messages") {
    const sender = obj.detail.event.userId;
    document
      .querySelector(`.message-row[data-sender=${sender}]`)
      .forEach((el) => el.remove());
    return;
  }
  if (obj.detail.listener !== "message") return;
  addMessage(obj.detail.event.data, obj.detail.event.renderedText);
});

function addMessage(data, message) {
  const limit = 15;
  const color = data.displayColor || `#${md5(displayName).substr(26)}`;
  const badges = data.badges.reduce(
    (acc, badge) => acc + `<img alt="" src="${badge.url}" class="badge">`,
    ""
  );

  const closeIcon = `<svg
      class="svg"
      version="1.1"
      id="Layer_1"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      fill="currentColor"
      x="0px"
      y="0px"
      width="12"
      height="12"
      viewBox="0 0 121.31 122.876"
      enable-background="new 0 0 121.31 122.876"
      xml:space="preserve"
    >
      <g>
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M90.914,5.296c6.927-7.034,18.188-7.065,25.154-0.068 c6.961,6.995,6.991,18.369,0.068,25.397L85.743,61.452l30.425,30.855c6.866,6.978,6.773,18.28-0.208,25.247 c-6.983,6.964-18.21,6.946-25.074-0.031L60.669,86.881L30.395,117.58c-6.927,7.034-18.188,7.065-25.154,0.068 c-6.961-6.995-6.992-18.369-0.068-25.397l30.393-30.827L5.142,30.568c-6.867-6.978-6.773-18.28,0.208-25.247 c6.983-6.963,18.21-6.946,25.074,0.031l30.217,30.643L90.914,5.296L90.914,5.296z"
        ></path>
      </g>
    </svg>`;

  const content = /*html */ `
    <div id="${data.msgId}" data-sender="${data.userId}" class="message" style="--color: ${color}">
        <div class="top">
        <div class="dot dot-red"></div>
        <div class="dot dot-yellow"></div>
        <div class="dot dot-green"></div>
        </div>
        <div class="meta">
            <div class="badges">${badges}</div>
            <div class="name">${data.displayName}</div>
        </div>
        <div class="content">${message}</div>
    </div>`;
  tchat.insertAdjacentHTML("beforeend", content);

  // On limite le nbre de message pour ne pas surcharger le rendu
  const messages = document.querySelectorAll(".message");
  const messageCount = messages.length;
  if (messageCount > limit) {
    Array.from(messages)
      .slice(0, messageCount - limit)
      .forEach((el) => {
        el.remove();
      });
  }
}
