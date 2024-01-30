import EventEmitter from 'boom-js-emitter'

const Emitter = new EventEmitter()
Emitter.listenners = []

Emitter.addFieldListener = function (ids, ...args) {
  const uniqueId = Emitter.listenners.push(ids) - 1
  Emitter.subscribe(`${uniqueId}-${ids.join(',')}`, ...args)
  return uniqueId
}

Emitter.removeFieldListener = function (event_id) {
  Emitter.unsubscribe(`${event_id}-${Emitter.listenners[event_id].join(',')}`)
  delete Emitter.listenners[event_id]
}

Emitter.emitFieldChange = function (id, ...args) {
  for (let i = 0; i < Emitter.listenners.length; i++)
    if (Emitter.listenners[i])
      for (let j = 0; j < Emitter.listenners[i].length; j++)
        if (`${id}`.indexOf(Emitter.listenners[i][j]) === 0)
          Emitter.emit(`${i}-${Emitter.listenners[i].join(',')}`, ...args)
}

export default Emitter
