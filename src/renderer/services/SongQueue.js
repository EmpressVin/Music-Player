// Create a class to store the individual song data
class SongNode {
  constructor({ id, path }, next = null, prev = null) {
    this.id = id;
    this.path = path;
    this.next = next;
    this.prev = prev;
  }
}

// Symbol definitions
const head = Symbol("head");
const tail = Symbol("tail");
const current = Symbol("current");
const length = Symbol("length");

// Create the song queue class
export default class SongQueue {
  constructor() {
    this[head] = null;
    this[tail] = null;
    this[current] = null;
    this[length] = 0;
  }

  addSongs(songs) {
    songs.forEach(song => this.push(song));
  }

  push(song) {
    const newSong = new SongNode(song);

    if (this[head] === null) {
      this[head] = newSong;
      this[tail] = newSong;
      this[current] = newSong;
    } else {
      this[tail].next = newSong;
      newSong.prev = this[tail];
      this[tail] = newSong;
    }

    this[length]++;
  }

  setCurrentById(id) {
    const searchedSong = this.findById(id);

    if (searchedSong === null) {
      throw new ReferenceError(
        `Song with id (${id}) does not exist in the song queue.`
      );
    } else {
      this[current] = searchedSong;
    }
  }

  findById(id) {
    let iterator = this[head];

    while (iterator !== null) {
      if (iterator.id === id) return iterator;

      iterator = iterator.next;
    }

    return null;
  }

  clear() {
    this[head] = null;
    this[tail] = null;
    this[current] = null;
    this[length] = 0;
  }

  next() {
    if (this[current] !== null && this[current].next !== null) {
      this[current] = this[current].next;
      return this[current];
    } else {
      return null;
    }
  }

  prev() {
    if (this[current] !== null && this[current].prev !== null) {
      this[current] = this[current].prev;
      return this[current];
    } else {
      return null;
    }
  }

  current() {
    if (this[current] !== null) {
      const { id, path } = this[current];
      return { id, path };
    } else {
      return null;
    }
  }
}

// //TODO: Check if next or previous are out of bounds
// export default class SongQueue {
//   constructor(songs = null, currentSongIndex = 0) {
//     this.songs = songs;
//     this.currentSongIndex = currentSongIndex;
//   }

//   setSongs(songs) {
//     this.songs = songs;
//   }

//   next() {
//     const nextSong = this.songs[this.currentSongIndex + 1];
//     this.currentSongIndex++;

//     return nextSong;
//   }

//   previous() {
//     const prevSong = this.songs[this.currentSongIndex - 1];
//     this.currentSongIndex--;

//     return prevSong;
//   }
// }
