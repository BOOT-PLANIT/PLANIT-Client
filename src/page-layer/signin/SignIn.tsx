"use client";

import Image from "next/image";

import { useGoogleLogin } from "@/feature/auth";
import { CheckIcon } from "@/shared/assets";

import { features } from "./model";
import styles from "./SignIn.module.scss";

const SignIn = () => {
  const { mutate: googleLogin, isPending } = useGoogleLogin();
  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.header}>
          <div className={styles.icon}>
            <Image alt="logo" src="/logo.svg" width={80} height={80} priority />
          </div>
          <h1 className={styles.title}>PLANIT</h1>
          <p className={styles.subtitle}>
            출석, 진행 상황, 훈련 수당을 관리하세요
          </p>
        </div>

        <div className={styles.features}>
          {features.map((feature, index) => (
            <div key={index} className={styles.featureItem}>
              <CheckIcon />
              <span>{feature}</span>
            </div>
          ))}
        </div>
        <div className={styles.buttonSection}>
          <button
            type="button"
            className={styles.buttonContainer}
            onClick={() => googleLogin()}
            disabled={isPending}
            aria-label="Google 계정으로 로그인"
          >
            <Image
              src="/google.svg"
              width={200}
              height={50}
              alt="google login"
              className={styles.googleImg}
              priority
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
