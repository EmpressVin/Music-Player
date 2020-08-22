import ContextMenuItem from './ContextMenuItem';
import ContextMenuDivider from './ContextMenuDivider';

import * as IconPath from '@/../constants/iconPaths';

const createContextMenuItem = (createElement, { text, icon, action }) => { //eslint-disable-line
  return createElement(ContextMenuItem, {
    props: {
      icon,
      text,
    },
  });
};

const getContextMenuItem = (createElement, itemName) => {
  switch (itemName) {
    case 'Add to Queue':
      return createContextMenuItem(createElement, {
        text: itemName,
        icon: IconPath.MUSIC_QUEUE_FILLED,
        action: () => {
          console.log('aaaaaa');
        },
      });
    case 'Add to Playlist':
      return createContextMenuItem(createElement, {
        text: itemName,
        icon: IconPath.PLAYLIST_ADD_FILLED,
        action: () => {
          console.log('Playlist!!!');
        },
      });
    case 'Go to Artist':
      return createContextMenuItem(createElement, {
        text: itemName,
        icon: IconPath.AUDIO_TRACK_FILLED,
        action: () => {
          console.log('dsfdsf');
        },
      });
    case 'Divider':
      return createElement(ContextMenuDivider);
  }
};

export default (type, createElement) => {
  let contextMenuItemTypes;

  switch (type) {
    case 'albumContextMenu':
      contextMenuItemTypes = ['Add to Queue', 'Add to Playlist'];
      break;
    case 'songContextMenu':
      contextMenuItemTypes = [
        'Add to Queue',
        'Go to Artist',
        'Divider',
        'Add to Playlist',
      ];
      break;
  }

  const contextMenuItems = contextMenuItemTypes.map(itemName =>
    getContextMenuItem(createElement, itemName)
  );

  return contextMenuItems;
};
