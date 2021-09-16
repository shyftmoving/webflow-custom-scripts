<script src="https://cdn.lordicon.com/libs/mssddfmo/lord-icon-2.1.0.js" ></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.7.1/gsap.min.js" ></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.7.1/MotionPathPlugin.min.js" ></script>
<lord-icon
      src="https://cdn.lordicon.com/uetqnvvg.json"
      trigger="loop"
      colors="primary:#2516c7,secondary:#2516c7"
      style="width: 50px; height: 50px; opacity: 0"
      id="truck-icon-01"
    >
    </lord-icon>
    <lord-icon
      src="https://cdn.lordicon.com/dlhcdyui.json"
      trigger="loop"
      colors="primary:#30e849,secondary:#3080e8"
      style="width: 50px; height: 50px; opacity: 0"
      id="truck-icon-02"
    >
    </lord-icon>
    <lord-icon
      src="https://cdn.lordicon.com/uetqnvvg.json"
      trigger="loop"
      colors="primary:#2516c7,secondary:#2516c7"
      style="width: 50px; height: 50px; opacity: 0"
      id="truck-icon-03"
    >
    </lord-icon>
    <script>
gsap.registerPlugin(MotionPathPlugin)

let truck01 = gsap.timeline({ repeat: -1, repeatDelay: 3 })
truck01
  .to('#truck-icon-01', { duration: 2, opacity: 1 }, 0)
  .to(
    '#truck-icon-01',
    {
      duration: 15,
      ease: 'power1.inOut',
      motionPath: {
        path: '#truckPathHero',
        align: '#truckPathHero',
        autoRotate: true,
        start: 1,
        end: 0,
        alignOrigin: [0.5, 0.8]
      }
    },
    0
  )
  .to('#truck-icon-01', { duration: 2, opacity: 0 }, '-=2')

let truck02 = gsap.timeline({ repeat: -1, repeatDelay: 3, delay: 3 })
truck02
  .to('#truck-icon-02', { duration: 2, opacity: 1 }, 0)
  .to(
    '#truck-icon-02',
    {
      duration: 15,
      ease: 'power1.inOut',
      motionPath: {
        path: '#truckPathHero',
        align: '#truckPathHero',
        autoRotate: true,
        start: 1,
        end: 0,
        alignOrigin: [0.5, 0.8]
      }
    },
    0
  )
  .to('#truck-icon-02', { duration: 2, opacity: 0 }, '-=2')

let truck03 = gsap.timeline({ repeat: -1, repeatDelay: 4, delay: 7 })
truck03
  .to('#truck-icon-03', { duration: 2, opacity: 1 }, 0)
  .to(
    '#truck-icon-03',
    {
      duration: 15,
      ease: 'power1.inOut',
      motionPath: {
        path: '#truckPathHero',
        align: '#truckPathHero',
        autoRotate: true,
        start: 1,
        end: 0,
        alignOrigin: [0.5, 0.8]
      }
    },
    0
  )
  .to('#truck-icon-03', { duration: 2, opacity: 0 }, '-=2')


    </script>