import AccordionComponent from "@/components/kendo/accordion/AccordionComponent.tsx";

export default function AccordionSample() {
  const items = [
    {
      id: "1",
      title: "Home",
      children: [
        {
          id: "2",
          title: <p>1231231231231</p>,
        },
        {
          id: "3",
          title: "Furniture",
        },
        {
          id: "4",
          title: "Lights",
        },
      ],
    },
    {
      id: "5",
      title: "Kitchen",
      children: [
        {
          id: "6",
          title: "Tables",
        },
        {
          id: "7",
          title: "Decor",
          children: [
            {
              id: "8",
              title: "Lights",
            },
            {
              id: "9",
              title: "Candles",
            },
            {
              id: "10",
              title: "Cook books",
            },
            {
              id: "11",
              title: "Plates",
            },
          ],
        },
        {
          id: "12",
          title: "Chairs",
        },
      ],
    },
    {
      id: "13",
      title: "Bathroom",
      disabled: true,
    },
  ];

  return (
    <div>
      <AccordionComponent items={items} />
    </div>
  );
}
