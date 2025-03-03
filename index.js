const inputEl = document.getElementById("title");
const createBtn = document.getElementById("create");
const listEl = document.getElementById("list");

const notes = [
  { title: "note1", completed: false },
  { title: "note2", completed: false },
  { title: "note3", completed: true },
];

function render() {
  listEl.innerHTML = "";
  if (notes.length === 0) {
    listEl.innerHTML = "<p>Нет элементов</p>";
  }
  for (let i = 0; i < notes.length; i++) {
    //for(let note of notes){
    listEl.insertAdjacentHTML("beforeend", getNotesTemplate(notes[i], i));
  }
}
render(notes);

createBtn.onclick = function () {
  const newNote = {
    title: inputEl.value,
    completed: false,
  };
  notes.push(newNote);
  render();

  inputEl.value = "";
};
listEl.onclick = function (evt) {
  if (evt.target.dataset.index) {
    const index = parseInt(evt.target.dataset.index);
    const type = evt.target.dataset.type;
    if (type === "toggle") {
      notes[index].completed = !notes[index].completed;
    } else if (type === "remove") {
      notes.splice(index, 1);
    }
    render();
  }
};
function getNotesTemplate(note, index) {
  return `<li class="list-group-item d-flex justify-content-between align-items-center">
            <span class="${
              note.completed ? "text-decoration-line-through" : ""
            }" >${note.title}</span>
            <span>
            <span class="btn btn-small btn-${
              note.completed ? "warning" : "success"
            }" 
                data-index="${index}" data-type="toggle" >&check;</span>
            <span class="btn btn-small btn-danger"
                data-index="${index}" data-type="remove" >&times;</span>
            </span>
        </li>`;
}
