import EventEmitter from 'events'

const eventEmitter = new EventEmitter()

export const events = {
  openModal: 'OPEN_MODAL',
}

export const emitEvent = eventEmitter.emit

export const onEvent = eventEmitter.on

export const onceEvent = eventEmitter.once

export const offEvent = eventEmitter.removeListener

export const openModal = (id) => emitEvent(events.openModal, id)