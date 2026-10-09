import styles from './AvatarPoseImage.module.css';

interface AvatarPoseImageProps {
  poseIndex: number;
  imageUrl: string;
}

/* La descripción accesible la da el contenedor del avatar; la imagen es decorativa. */
export function AvatarPoseImage({ poseIndex, imageUrl }: AvatarPoseImageProps) {
  return (
    <img
      data-avatar-pose={poseIndex}
      src={imageUrl}
      alt=""
      draggable={false}
      className={styles.pose}
    />
  );
}
