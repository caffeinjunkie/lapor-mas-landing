import * as React from "react";

import { IconSvgProps } from "@/types";

export const CameraIcon: React.FC<IconSvgProps> = ({
  fill = "currentColor",
  size,
  height,
  width,
  ...props
}) => (
  <svg
    fill="none"
    height={size || height || 24}
    viewBox="0 0 24 24"
    width={size || width || 24}
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      clipRule="evenodd"
      d="M17.44 6.236c.04.07.11.12.2.12 2.4 0 4.36 1.958 4.36 4.355v5.934A4.368 4.368 0 0117.64 21H6.36A4.361 4.361 0 012 16.645V10.71a4.361 4.361 0 014.36-4.355c.08 0 .16-.04.19-.12l.06-.12.106-.222a97.79 97.79 0 01.714-1.486C7.89 3.51 8.67 3.01 9.64 3h4.71c.97.01 1.76.51 2.22 1.408.157.315.397.822.629 1.31l.141.299.1.22zm-.73 3.836c0 .5.4.9.9.9s.91-.4.91-.9-.41-.909-.91-.909-.9.41-.9.91zm-6.44 1.548c.47-.47 1.08-.719 1.73-.719.65 0 1.26.25 1.72.71.46.459.71 1.068.71 1.717A2.438 2.438 0 0112 15.756c-.65 0-1.26-.25-1.72-.71a2.408 2.408 0 01-.71-1.717v-.01c-.01-.63.24-1.24.7-1.699zm4.5 4.485a3.91 3.91 0 01-2.77 1.15 3.921 3.921 0 01-3.93-3.926 3.865 3.865 0 011.14-2.767A3.921 3.921 0 0112 9.402c1.05 0 2.04.41 2.78 1.15.74.749 1.15 1.738 1.15 2.777a3.958 3.958 0 01-1.16 2.776z"
      fill={fill}
      fillRule="evenodd"
    />
  </svg>
);

export const IGIcon: React.FC<IconSvgProps> = ({
  size = 24,
  width,
  height,
  ...props
}) => (
  <svg
    height={size || height}
    viewBox="0 0 40 40"
    width={size || width}
    {...props}
  >
    <path
      d="M27.2914 5.41641C29.2236 5.42218 31.0751 6.19231 32.4414 7.55861C33.8077 8.92491 34.5778 10.7764 34.5836 12.7086V27.2914C34.5778 29.2236 33.8077 31.0751 32.4414 32.4414C31.0751 33.8077 29.2236 34.5778 27.2914 34.5836H12.7086C10.7764 34.5778 8.92491 33.8077 7.55861 32.4414C6.19231 31.0751 5.42218 29.2236 5.41641 27.2914V12.7086C5.42218 10.7764 6.19231 8.92491 7.55861 7.55861C8.92491 6.19231 10.7764 5.42218 12.7086 5.41641H27.2914ZM27.2914 2.5H12.7086C7.09375 2.5 2.5 7.09375 2.5 12.7086V27.2914C2.5 32.9062 7.09375 37.5 12.7086 37.5H27.2914C32.9062 37.5 37.5 32.9062 37.5 27.2914V12.7086C37.5 7.09375 32.9062 2.5 27.2914 2.5Z"
      fill="currentColor"
    />
    <path
      d="M29.4789 12.7086C29.0463 12.7086 28.6233 12.5803 28.2636 12.3399C27.9039 12.0996 27.6235 11.7579 27.4579 11.3582C27.2924 10.9585 27.249 10.5187 27.3334 10.0943C27.4178 9.67 27.6262 9.28023 27.9321 8.9743C28.238 8.66837 28.6278 8.46003 29.0522 8.37563C29.4765 8.29122 29.9163 8.33454 30.316 8.50011C30.7157 8.66568 31.0574 8.94605 31.2978 9.30579C31.5381 9.66552 31.6664 10.0884 31.6664 10.5211C31.667 10.8085 31.6109 11.0933 31.5012 11.3589C31.3914 11.6246 31.2303 11.866 31.0271 12.0693C30.8238 12.2725 30.5824 12.4336 30.3168 12.5433C30.0511 12.6531 29.7663 12.7092 29.4789 12.7086ZM20 14.1664C21.1538 14.1664 22.2816 14.5085 23.241 15.1495C24.2003 15.7906 24.948 16.7016 25.3895 17.7676C25.8311 18.8335 25.9466 20.0065 25.7215 21.1381C25.4964 22.2697 24.9408 23.3091 24.125 24.125C23.3091 24.9408 22.2697 25.4964 21.1381 25.7215C20.0065 25.9466 18.8335 25.8311 17.7676 25.3895C16.7016 24.948 15.7906 24.2003 15.1495 23.241C14.5085 22.2816 14.1664 21.1538 14.1664 20C14.1681 18.4533 14.7832 16.9705 15.8769 15.8769C16.9705 14.7832 18.4533 14.1681 20 14.1664ZM20 11.25C18.2694 11.25 16.5777 11.7632 15.1388 12.7246C13.6998 13.6861 12.5783 15.0527 11.9161 16.6515C11.2538 18.2504 11.0805 20.0097 11.4181 21.707C11.7558 23.4044 12.5891 24.9635 13.8128 26.1872C15.0365 27.4109 16.5956 28.2443 18.293 28.5819C19.9903 28.9195 21.7496 28.7462 23.3485 28.0839C24.9473 27.4217 26.3139 26.3002 27.2754 24.8612C28.2368 23.4223 28.75 21.7306 28.75 20C28.75 17.6794 27.8281 15.4538 26.1872 13.8128C24.5462 12.1719 22.3206 11.25 20 11.25Z"
      fill="currentColor"
    />
  </svg>
);

export const YTIcon: React.FC<IconSvgProps> = ({
  size = 24,
  width,
  height,
  ...props
}) => (
  <svg
    height={size || height}
    viewBox="0 0 40 40"
    width={size || width}
    {...props}
  >
    <g clipPath="url(#clip0_11_21)">
      <path
        d="M39.7375 11.6242C39.7375 8.10859 37.1515 5.28047 33.9562 5.28047C29.6281 5.07812 25.214 5 20.7031 5H19.2969C14.7969 5 10.375 5.07812 6.04686 5.28125C2.85936 5.28125 0.273424 8.125 0.273424 11.6406C0.0781118 14.4211 -0.0047007 17.2023 -1.31969e-05 19.9836C-0.0078257 22.7648 0.080716 25.5487 0.265612 28.3352C0.265612 31.8508 2.85155 34.7023 6.03905 34.7023C10.5859 34.9133 15.25 35.007 19.9922 34.9992C24.7422 35.0148 29.3932 34.9159 33.9453 34.7023C37.1406 34.7023 39.7265 31.8508 39.7265 28.3352C39.914 25.5461 40 22.7648 39.9922 19.9758C40.0099 17.1945 39.925 14.4107 39.7375 11.6242ZM16.1719 27.6477V12.2961L27.5 19.968L16.1719 27.6477Z"
        fill="currentColor"
      />
    </g>
  </svg>
);

export const FacebookIcon: React.FC<IconSvgProps> = ({
  size = 24,
  width,
  height,
  ...props
}) => (
  <svg
    height={size || height}
    viewBox="0 0 40 40"
    width={size || width}
    {...props}
  >
    <path
      d="M37.5 20.1055C37.5 10.4414 29.6641 2.60547 20 2.60547C10.3359 2.60547 2.5 10.4414 2.5 20.1055C2.5 28.8398 8.89844 36.0797 17.2656 37.3937V25.1656H12.8211V20.1055H17.2656V16.25C17.2656 11.8648 19.8789 9.44062 23.8758 9.44062C25.7906 9.44062 27.7938 9.78281 27.7938 9.78281V14.0898H25.5859C23.4133 14.0898 22.7336 15.4383 22.7336 16.8242V20.1055H27.5867L26.8117 25.1656H22.7344V37.3953C31.1016 36.082 37.5 28.8422 37.5 20.1055Z"
      fill="currentColor"
    />
  </svg>
);

export const WapresIcon: React.FC<IconSvgProps> = ({
  size = 24,
  width,
  height,
  ...props
}) => (
  <svg
    height={size || height}
    viewBox="0 0 24 24"
    width={size || width}
    {...props}
  >
    <path
      clipRule="evenodd"
      d="M21.721 12.752a9.711 9.711 0 0 0-.945-5.003 12.754 12.754 0 0 1-4.339 2.708 18.991 18.991 0 0 1-.214 4.772 17.165 17.165 0 0 0 5.498-2.477ZM14.634 15.55a17.324 17.324 0 0 0 .332-4.647c-.952.227-1.945.347-2.966.347-1.021 0-2.014-.12-2.966-.347a17.515 17.515 0 0 0 .332 4.647 17.385 17.385 0 0 0 5.268 0ZM9.772 17.119a18.963 18.963 0 0 0 4.456 0A17.182 17.182 0 0 1 12 21.724a17.18 17.18 0 0 1-2.228-4.605ZM7.777 15.23a18.87 18.87 0 0 1-.214-4.774 12.753 12.753 0 0 1-4.34-2.708 9.711 9.711 0 0 0-.944 5.004 17.165 17.165 0 0 0 5.498 2.477ZM21.356 14.752a9.765 9.765 0 0 1-7.478 6.817 18.64 18.64 0 0 0 1.988-4.718 18.627 18.627 0 0 0 5.49-2.098ZM2.644 14.752c1.682.971 3.53 1.688 5.49 2.099a18.64 18.64 0 0 0 1.988 4.718 9.765 9.765 0 0 1-7.478-6.816ZM13.878 2.43a9.755 9.755 0 0 1 6.116 3.986 11.267 11.267 0 0 1-3.746 2.504 18.63 18.63 0 0 0-2.37-6.49ZM12 2.276a17.152 17.152 0 0 1 2.805 7.121c-.897.23-1.837.353-2.805.353-.968 0-1.908-.122-2.805-.353A17.151 17.151 0 0 1 12 2.276ZM10.122 2.43a18.629 18.629 0 0 0-2.37 6.49 11.266 11.266 0 0 1-3.746-2.504 9.754 9.754 0 0 1 6.116-3.985Z"
      fill="currentColor"
      fillRule="evenodd"
    />
  </svg>
);

export const MoonFilledIcon = ({
  size = 24,
  width,
  height,
  ...props
}: IconSvgProps) => (
  <svg
    aria-hidden="true"
    focusable="false"
    height={size || height}
    role="presentation"
    viewBox="0 0 24 24"
    width={size || width}
    {...props}
  >
    <path
      d="M21.53 15.93c-.16-.27-.61-.69-1.73-.49a8.46 8.46 0 01-1.88.13 8.409 8.409 0 01-5.91-2.82 8.068 8.068 0 01-1.44-8.66c.44-1.01.13-1.54-.09-1.76s-.77-.55-1.83-.11a10.318 10.318 0 00-6.32 10.21 10.475 10.475 0 007.04 8.99 10 10 0 002.89.55c.16.01.32.02.48.02a10.5 10.5 0 008.47-4.27c.67-.93.49-1.519.32-1.79z"
      fill="currentColor"
    />
  </svg>
);

export const SunFilledIcon = ({
  size = 24,
  width,
  height,
  ...props
}: IconSvgProps) => (
  <svg
    aria-hidden="true"
    focusable="false"
    height={size || height}
    role="presentation"
    viewBox="0 0 24 24"
    width={size || width}
    {...props}
  >
    <g fill="currentColor">
      <path d="M19 12a7 7 0 11-7-7 7 7 0 017 7z" />
      <path d="M12 22.96a.969.969 0 01-1-.96v-.08a1 1 0 012 0 1.038 1.038 0 01-1 1.04zm7.14-2.82a1.024 1.024 0 01-.71-.29l-.13-.13a1 1 0 011.41-1.41l.13.13a1 1 0 010 1.41.984.984 0 01-.7.29zm-14.28 0a1.024 1.024 0 01-.71-.29 1 1 0 010-1.41l.13-.13a1 1 0 011.41 1.41l-.13.13a1 1 0 01-.7.29zM22 13h-.08a1 1 0 010-2 1.038 1.038 0 011.04 1 .969.969 0 01-.96 1zM2.08 13H2a1 1 0 010-2 1.038 1.038 0 011.04 1 .969.969 0 01-.96 1zm16.93-7.01a1.024 1.024 0 01-.71-.29 1 1 0 010-1.41l.13-.13a1 1 0 011.41 1.41l-.13.13a.984.984 0 01-.7.29zm-14.02 0a1.024 1.024 0 01-.71-.29l-.13-.14a1 1 0 011.41-1.41l.13.13a1 1 0 010 1.41.97.97 0 01-.7.3zM12 3.04a.969.969 0 01-1-.96V2a1 1 0 012 0 1.038 1.038 0 01-1 1.04z" />
    </g>
  </svg>
);

export const RefreshIcon = ({
  size = 18,
  fill = "currentColor",
  width,
  height,
  ...props
}: IconSvgProps) => (
  <svg
    fill="none"
    height={height || size}
    viewBox="0 0 1024 1024"
    width={width || size}
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g id="SVGRepo_bgCarrier" strokeWidth="0" />
    <g
      id="SVGRepo_tracerCarrier"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <g id="SVGRepo_iconCarrier">
      <path
        clipRule="evenodd"
        d="M289.088 296.704h92.992a32 32 0 0 1 0 64H232.96a32 32 0 0 1-32-32V179.712a32 32 0 0 1 64 0v50.56a384 384 0 0 1 643.84 282.88 384 384 0 0 1-383.936 384 384 384 0 0 1-384-384h64a320 320 0 1 0 640 0 320 320 0 0 0-555.712-216.448z"
        fill={fill}
        fillRule="evenodd"
      />
    </g>
  </svg>
);

export const MapIcon = ({
  size = 18,
  fill = "currentColor",
  width,
  height,
  ...props
}: IconSvgProps) => (
  <svg
    fill="none"
    height={height || size}
    viewBox="0 0 24 24"
    width={width || size}
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g id="SVGRepo_bgCarrier" strokeWidth="0" />
    <g
      id="SVGRepo_tracerCarrier"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <g id="SVGRepo_iconCarrier">
      <path
        d="M12.5 7.04148C12.3374 7.0142 12.1704 7 12 7C10.3431 7 9 8.34315 9 10C9 11.6569 10.3431 13 12 13C13.6569 13 15 11.6569 15 10C15 9.82964 14.9858 9.6626 14.9585 9.5"
        stroke={fill}
        strokeLinecap="round"
        strokeWidth="1.5"
      />
      <path
        d="M5 15.2161C4.35254 13.5622 4 11.8013 4 10.1433C4 5.64588 7.58172 2 12 2C16.4183 2 20 5.64588 20 10.1433C20 14.6055 17.4467 19.8124 13.4629 21.6744C12.5343 22.1085 11.4657 22.1085 10.5371 21.6744C9.26474 21.0797 8.13831 20.1439 7.19438 19"
        stroke={fill}
        strokeLinecap="round"
        strokeWidth="1.5"
      />
    </g>
  </svg>
);

export const HeartFilledIcon = ({
  size = 24,
  width,
  height,
  ...props
}: IconSvgProps) => (
  <svg
    aria-hidden="true"
    focusable="false"
    height={size || height}
    role="presentation"
    viewBox="0 0 24 24"
    width={size || width}
    {...props}
  >
    <path
      d="M12.62 20.81c-.34.12-.9.12-1.24 0C8.48 19.82 2 15.69 2 8.69 2 5.6 4.49 3.1 7.56 3.1c1.82 0 3.43.88 4.44 2.24a5.53 5.53 0 0 1 4.44-2.24C19.51 3.1 22 5.6 22 8.69c0 7-6.48 11.13-9.38 12.12Z"
      fill="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
    />
  </svg>
);

export const SearchIcon = (props: IconSvgProps) => (
  <svg
    aria-hidden="true"
    fill="none"
    focusable="false"
    height="1em"
    role="presentation"
    viewBox="0 0 24 24"
    width="1em"
    {...props}
  >
    <path
      d="M11.5 21C16.7467 21 21 16.7467 21 11.5C21 6.25329 16.7467 2 11.5 2C6.25329 2 2 6.25329 2 11.5C2 16.7467 6.25329 21 11.5 21Z"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
    />
    <path
      d="M22 22L20 20"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
    />
  </svg>
);
