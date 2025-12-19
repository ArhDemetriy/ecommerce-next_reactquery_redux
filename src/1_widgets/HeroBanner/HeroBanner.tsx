import Image from 'next/image';

export function HeroBanner() {
  return (
    <section className="flex justify-between gap-3.5 overflow-hidden rounded-[10px] bg-white py-[20px] text-body text-black sm:rounded-[20px] sm:py-[27px]">
      <div className="ml-5 flex flex-col justify-center gap-2.5 sm:ml-10 sm:gap-5">
        <h1 className="text-h3 sm:text-h1">Производство гибкой пластиковой упаковки</h1>
        <p className="text-description sm:text-body">По индивидуальным размерам и в минимальные сроки</p>
      </div>

      <Image
        src="/Checkbox.svg"
        alt="Checkbox decoration"
        width={112}
        height={123}
        className="mr-5 w-[50px] self-end sm:mr-[60px] sm:w-[111px]"
      />
    </section>
  );
}
