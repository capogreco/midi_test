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
   console.log (r)
})



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