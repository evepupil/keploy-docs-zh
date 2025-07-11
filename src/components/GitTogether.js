import React from "react";

export const GitTogether = () => {
  return (
    <section className="mb-14 mt-1">
      <h2 className="mt-8 text-2xl font-semibold tracking-wide md:text-3xl">
        参加GitTogether
      </h2>
      <a href="https://keploy.io/gittogether">
        <img
          className="mt-8 "
          src="/docs/img/GitTogether.jpg"
          alt={"GitTogether 图片"}
        />
      </a>
      <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2">
        <a
          className=" scale flex flex-col items-center justify-center space-y-3 rounded-lg border-2 border-[color:orange] p-4 text-center shadow-lg"
          href="https://docs.google.com/forms/d/e/1FAIpQLSdXYwF3j6AjVrGQn2RWKXqI5awbdmWK7mW2gQYCNAfpqaGZhA/viewform"
        >
          <p className="text-lg font-semibold">立即注册</p>
        </a>
        <a
          className=" scale flex flex-col items-center justify-center space-y-3 rounded-lg border-2 border-[color:orange] p-4 text-center shadow-lg"
          href="https://docs.google.com/forms/d/e/1FAIpQLSclnnqTRA4x_YhG67eLNOK3LO4-ttqobbMZ5gbUclGNQDvmCg/viewform"
        >
          <p className="text-lg font-semibold">提交提案</p>
        </a>
      </div>
    </section>
  );
};