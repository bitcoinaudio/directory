<script>
  const testimonials = [
    {
      name: "Peter",
      id: "1",
      position: "Lead Developer",
      quote:
        "I really like this marketing agency. They are very professional and know how to get the job done. I would recommend them to anyone.",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
    {
      name: "David",
      id: "2",
      position: "Marketing Manager",
      quote:
        "Wonderful team, great service and always available to answer any queries. I always recommend them to my friends.",
      image:
        "https://images.unsplash.com/photo-1566492031773-4f4e44671857?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
    {
      name: "Marc",
      id: "3",
      position: "Human Resources",
      quote: "The best way to market your business. Impressive results.",
      image:
        "https://images.unsplash.com/photo-1463453091185-61582044d556?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
    {
      name: "Lisa",
      id: "4",
      position: "Accounting Manager",
      quote:
        "First I was not sure about them but now I am a fan. My website is ranking on top of google.",
      image:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
  ];
</script>

<div
  id="testimonial"
  class="my-20 flex flex-col items-center justify-center md:my-32"
>
  <div class="flex flex-col items-center justify-center">
    <h1 class="text-center font-urbanist text-2xl font-semibold md:text-5xl">
      Testimonials
    </h1>
    <span class="text-md mt-2 px-2 font-urbanist md:mt-4 md:px-5 md:text-xl">
      What Our Clients Says About Us
    </span>
  </div>

  <div class="py-6 lg:py-10 flex flex-col max-w-7xl">
    <div
      class="carousel mx-2 lg:mx-4 max-w-full h-96 rounded-xl border border-base-content/10"
    >
      {#each testimonials as item, index}
        <div
          id={item.id}
          class="carousel-item w-full flex items-center justify-center"
        >
          <figure class="mx-2 lg:mx-4 mt-6 lg:mt-10 max-w-full">
            <blockquote
              class="text-center font-urbanist font-bold leading-8 text-md lg:text-3xl lg:px-10"
            >
              <p>“{item.quote}”</p>
            </blockquote>
            <div class="mt-6 lg:mt-10 flex flex-col items-center">
              <img
                class="mx-auto h-12 lg:h-14 w-12 lg:w-14 rounded-full"
                src={item.image}
                alt={item.name}
              />
              <div class="mt-2 lg:mt-4 flex flex-col items-center">
                <div class="text-sm lg:text-base">{item.name}</div>
                <div class="text-xs lg:text-sm text-base-content/50">
                  {item.position}
                </div>
              </div>
            </div>
          </figure>
        </div>
      {/each}
    </div>
    <div class="flex justify-center w-full py-2 gap-2">
      <a href="#1" class="btn btn-xs">1</a>
      <a href="#2" class="btn btn-xs">2</a>
      <a href="#3" class="btn btn-xs">3</a>
      <a href="#4" class="btn btn-xs">4</a>
    </div>
  </div>
</div>
