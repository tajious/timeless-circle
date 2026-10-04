const copyButton = document.querySelector(".copy-invite");
const copyLabel = copyButton.querySelector(".copy-action");
const inviteCode = copyButton.querySelector(".invite-code");
const idleLabel = copyLabel.textContent;
const resetDelay = 2400;

function copyWithSelection() {
  const selection = window.getSelection();
  if (!selection) return false;
  selection.selectAllChildren(inviteCode);
  return true;
}

function copyWithTextarea() {
  const field = document.createElement("textarea");
  field.value = copyButton.dataset.invite;
  field.style.position = "fixed";
  field.style.opacity = "0";
  document.body.appendChild(field);
  field.select();
  const succeeded = document.execCommand("copy");
  field.remove();
  return succeeded;
}

async function copyText(text) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    return copyWithTextarea();
  }
}

function showOutcome(message, announced) {
  copyLabel.textContent = message;
  if (announced) {
    copyButton.setAttribute("aria-label", "Discord invite copied");
  }
  window.setTimeout(() => {
    copyLabel.textContent = idleLabel;
    copyButton.removeAttribute("aria-label");
  }, resetDelay);
}

copyButton.addEventListener("click", async () => {
  const invite = copyButton.dataset.invite;

  if (await copyText(invite)) {
    showOutcome("Copied!", true);
    return;
  }

  if (copyWithSelection()) {
    showOutcome("Select & copy", false);
    return;
  }

  copyButton.focus();
});
