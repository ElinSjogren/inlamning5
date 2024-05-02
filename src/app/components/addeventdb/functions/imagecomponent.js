import Image from 'next/image';

function LazyLoadedImage() {
  return (
    <div>
      <Image
        width={100}
        height={100}
        layout="responsive"
      />
    </div>
  );
}

export default LazyLoadedImage;
