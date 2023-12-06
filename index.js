const fileInput = document.getElementById("fileSelector"),
      container = document.getElementById("container"),
      previewArea = document.getElementById("previewArea"),
      div = [],
      img = [],
      rankingArea = document.createElement("div");
let   elementCounter = 0,
      previewImageHeight = 100,
      imageHeight = 350,
      animationsTransitionTime = 350;

fileInput.addEventListener("change", fileUploader);

const deleteButton = document.getElementById("deleteLastImg");
deleteButton.addEventListener("click", imgDeleter);

const createRankingListButton = document.getElementById("createRanking");
createRankingListButton.addEventListener("click", createRankingArea);

function fileUploader() {
  for (let i = 0; i < this.files.length; i++) {
    div.push(document.createElement("div"));
    img.push(document.createElement("img"));
    img[img.length - 1].src = URL.createObjectURL(this.files[i]);
    img[img.length - 1].height = previewImageHeight;
    img[img.length - 1].onload = () => {
      URL.revokeObjectURL(img[img.length - 1].src);
    };
    previewArea.appendChild(div[div.length - 1]);
    div[div.length - 1].appendChild(img[img.length - 1]);
  };
  elementCounter += this.files.length;
};

function imgDeleter() {
  if (elementCounter > 0) {
    div.pop();
    img.pop();
    previewArea.lastChild.remove();
    elementCounter--;
  }; 
 };

function clearView(element) {
  document.getElementById(element).innerHTML="";
};

function createRankingArea() {
  if (elementCounter > 0) {
    clearView('container');

    container.appendChild(rankingArea);
    rankingArea.id = "rankingArea";
    rankingArea.style = "display: flex; flex-direction: row;";

    createRankingList();
  };
};

function createRankingList () {
  for (let i = 0; i < elementCounter; i++) {
    const rankingBlock = document.createElement("div");
    rankingBlock.classList.add("rankingBlock");
    rankingArea.appendChild(rankingBlock);
    
    const divForText = document.createElement("div");
    divForText.style = "display: flex; flex-direction: row;";
    const divForNumber = document.createElement("div");
    divForNumber.innerHTML = `${i + 1}.`;
    const divForName = document.createElement("div");
    divForName.id = `Name${i}`;
    //temp decision
    divForName.innerHTML = `Name${i}`;
    
    rankingBlock.appendChild(divForText);
    divForText.appendChild(divForNumber);
    divForText.appendChild(divForName);
    
    const divForImg = document.createElement("div");
    rankingBlock.appendChild(divForImg);
    divForImg.appendChild(img[i]);
    img[i].height = imageHeight;

    const divForButton = document.createElement("div");
    divForButton.style = "display: flex; flex-direction: row;";
    rankingBlock.appendChild(divForButton);
    
    if (i > 0) {
      const leftButton = document.createElement("button");
      leftButton.classList.add("moveButton");
      divForButton.appendChild(leftButton);
      leftButton.innerText = "<";
      leftButton.addEventListener("click", moveToTheLeft);
    };
    if (i < elementCounter - 1) {
      const rightButton = document.createElement("button");
      rightButton.classList.add("moveButton");
      divForButton.appendChild(rightButton);
      rightButton.innerText = ">";
      rightButton.addEventListener("click", moveToTheRight);
    };
  };
};

// function moveToTheLeft() {
//   //part for swapping names
//   const currentRankingBlock = this.parentNode.parentNode;
//   const previousRankingBlock = currentRankingBlock.previousSibling;
//   const currentNeededNameParent = currentRankingBlock.firstChild;
//   const previousNeededNameParent = previousRankingBlock.firstChild;
//   const currentNameNode = currentNeededNameParent.lastChild;
//   const previousNameNode = previousNeededNameParent.lastChild;

//   currentNameNode.remove();
//   previousNameNode.remove();

//   currentNeededNameParent.appendChild(previousNameNode);
//   previousNeededNameParent.appendChild(currentNameNode);
  
//   //part for swapping images
//   const currentNeededImgParent = currentRankingBlock.childNodes[1];
//   const previousNeededImgParent = previousRankingBlock.childNodes[1];
//   const currentImgNode = currentNeededImgParent.firstChild;
//   const previousImgNode = previousNeededImgParent.firstChild;
  
//   currentImgNode.remove();
//   previousImgNode.remove();

//   currentNeededImgParent.appendChild(previousImgNode);
//   previousNeededImgParent.appendChild(currentImgNode);
// };

// function moveToTheRight() {
//   //part for swapping names
//   const currentRankingBlock = this.parentNode.parentNode;
//   const nextRankingBlock = currentRankingBlock.nextSibling;
//   const currentNeededNameParent = currentRankingBlock.firstChild;
//   const nextNeededNameParent = nextRankingBlock.firstChild;
//   const currentNameNode = currentNeededNameParent.lastChild;
//   const nextNameNode = nextNeededNameParent.lastChild;

//   currentNameNode.remove();
//   nextNameNode.remove();

//   currentNeededNameParent.appendChild(nextNameNode);
//   nextNeededNameParent.appendChild(currentNameNode);
  
//   //part for swapping images
//   const currentNeededImgParent = currentRankingBlock.childNodes[1];
//   const nextNeededImgParent = nextRankingBlock.childNodes[1];
//   const currentImgNode = currentNeededImgParent.firstChild;
//   const nextImgNode = nextNeededImgParent.firstChild;
  
//   currentImgNode.remove();
//   nextImgNode.remove();

//   currentNeededImgParent.appendChild(nextImgNode);
//   nextNeededImgParent.appendChild(currentImgNode);
// };

function moveToTheLeft() {
  const currentRankingBlock = this.parentNode.parentNode;
  const previousRankingBlock = currentRankingBlock.previousSibling;
  const currentNeededNameParent = currentRankingBlock.firstChild;
  const previousNeededNameParent = previousRankingBlock.firstChild;
  const currentNameNode = currentNeededNameParent.lastChild;
  const previousNameNode = previousNeededNameParent.lastChild;
  const currentNeededImgParent = currentRankingBlock.childNodes[1];
  const previousNeededImgParent = previousRankingBlock.childNodes[1];
  const currentImgNode = currentNeededImgParent.firstChild;
  const previousImgNode = previousNeededImgParent.firstChild;

  previousRankingBlock.style.scale = "0";

  setTimeout(() => {
    previousNameNode.remove();
    previousImgNode.remove();
    previousNeededNameParent.appendChild(currentNameNode.cloneNode(true));
    previousNeededImgParent.appendChild(currentImgNode.cloneNode(true));
    previousRankingBlock.style.scale = "1";
    currentRankingBlock.style.scale = "0";
  }, animationsTransitionTime);

  setTimeout(() => {
    currentNameNode.remove();
    currentImgNode.remove();
    currentNeededNameParent.appendChild(previousNameNode);
    currentNeededImgParent.appendChild(previousImgNode);
    currentRankingBlock.style.scale = "1";
  }, 2* animationsTransitionTime);
};

function moveToTheRight() {
  const currentRankingBlock = this.parentNode.parentNode;
  const nextRankingBlock = currentRankingBlock.nextSibling;
  const currentNeededNameParent = currentRankingBlock.firstChild;
  const nextNeededNameParent = nextRankingBlock.firstChild;
  const currentNameNode = currentNeededNameParent.lastChild;
  const nextNameNode = nextNeededNameParent.lastChild;
  const currentNeededImgParent = currentRankingBlock.childNodes[1];
  const nextNeededImgParent = nextRankingBlock.childNodes[1];
  const currentImgNode = currentNeededImgParent.firstChild;
  const nextImgNode = nextNeededImgParent.firstChild;

  nextRankingBlock.style.scale = "0";

  setTimeout(() => {
    nextNameNode.remove();
    nextImgNode.remove();
    nextNeededNameParent.appendChild(currentNameNode.cloneNode(true));
    nextNeededImgParent.appendChild(currentImgNode.cloneNode(true));
    nextRankingBlock.style.scale = "1";
    currentRankingBlock.style.scale = "0";
  }, animationsTransitionTime);

  setTimeout(() => {
    currentNameNode.remove();
    currentImgNode.remove();
    currentNeededNameParent.appendChild(nextNameNode);
    currentNeededImgParent.appendChild(nextImgNode);
    currentRankingBlock.style.scale = "1";
  }, 2 * animationsTransitionTime);
};