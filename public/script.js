document.body.style.margin   = 0
document.body.style.overflow = `hidden`

navigator.permissions.query ({ 
   name: `midi`, 
   sysex: true 
}).then (r => {
   if (r.state === `granted`) {
      console.log (`MIDI granted`)
   } else if (r.state === `prompt`) {
      console.log (`MIDI prompt`)
   }
})

navigator.requestMIDIAccess ().then (midi => {
   startLoggingMIDIInput (midi)
})

function onMIDIMessage(event) {
   let str = `MIDI message received at timestamp ${event.timeStamp}[${event.data.length} bytes]: `;
   for (const character of event.data) {
     str += `0x${character.toString(16)} `;
   }
   console.log(str);
 }
 
 function startLoggingMIDIInput(midiAccess) {
   midiAccess.inputs.forEach((entry) => {
     entry.onmidimessage = onMIDIMessage;
   });
 }
 


const cnv = document.getElementById (`cnv_element`)
cnv.width = innerWidth
cnv.height = innerHeight

const ctx = cnv.getContext (`2d`)

const draw_frame = () => {
   ctx.fillStyle = `turquoise`
   ctx.fillRect (0, 0, innerWidth, innerHeight)

   requestAnimationFrame (draw_frame)
}

draw_frame ()

globalThis.onresize = () => {
   cnv.width = innerWidth
   cnv.height = innerHeight   
}