import React from "react";
import Layout from "@theme/Layout";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";

function PrivacyPolicy() {
  const context = useDocusaurusContext();
  const {siteConfig = {}} = context;
  return (
    <Layout
      title="Keploy公司隐私政策"
      permalink="/privacy-policy"
      description="关于Keploy的隐私政策信息"
    >
      <main className="margin-vert--lg container">
        <div className="pb-5 text-center text-4xl font-bold">
          Keploy公司隐私政策
        </div>
        <p className="text-2l md:text-3l mb-2 font-bold tracking-wide">
          最后更新：2024年4月28日
        </p>
        <p className="text-l mb-8">
          Keploy公司运营{" "}
          <a href="https://keploy.io" style={{color: "#FF914D"}}>
            https://keploy.io
          </a>{" "}
          和{" "}
          <a href="https://keploy.io/docs" style={{color: "#FF914D"}}>
            https://docs.keploy.io
          </a>{" "}
          （以下简称"网站"）。请仔细阅读本隐私政策，了解我们关于个人信息收集、处理和存储的政策与实践。通过访问或使用我们的服务（定义见下文），即表示您理解我们将按照本隐私政策处理您的个人信息。如果您不同意或不满意本隐私政策的任何方面，应立即停止访问或使用我们的服务。
        </p>
        <p className="text-l mb-8">
          我们仅将您的个人信息用于提供和改进网站服务。使用网站即表示您同意按照本政策收集和使用信息。
        </p>
        <h2
          id="information-collection-and-use"
          className="mb-4 text-2xl font-semibold tracking-wide md:text-3xl"
        >
          信息收集与使用
        </h2>
        <p className="text-l mb-8">
          当您浏览并与我们的网站互动时，我们可能使用自动数据收集技术收集有关您设备、浏览行为和模式的特定信息，包括：(a) 您访问网站的详细信息，包括流量数据、位置数据、日志和其他通信数据，以及您访问和使用的资源；(b) 关于您计算机和互联网连接的信息，包括IP地址、操作系统和浏览器类型。我们自动收集的信息有助于改进我们的服务，提供更好且更个性化的服务，包括使我们能够：(i) 估计受众规模和用户模式；(ii) 存储您的偏好信息，让我们根据您的个人兴趣定制服务；(iii) 加快您的搜索速度；(iv) 当您返回我们的服务时识别您。有关我们可能使用的Cookie和跟踪技术的更多信息，请参阅下文"Cookie"部分。（"个人信息"）
        </p>
        <h2
          id="log-data"
          className="mb-4 text-2xl font-semibold tracking-wide md:text-3xl"
        >
          日志数据
        </h2>
        <p className="text-l mb-8">
          与许多网站运营商一样，我们收集您的浏览器在访问我们网站时发送的信息（"日志数据"）。这些日志数据可能包括您计算机的互联网协议（"IP"）地址、浏览器类型、浏览器版本、您访问的网站页面、访问时间和日期、在这些页面上花费的时间以及其他统计数据。此外，我们可能使用Google Analytics等第三方服务来收集、监控和分析这些数据。
        </p>
        <h2
          id="communications"
          className="mb-4 text-2xl font-semibold tracking-wide md:text-3xl"
        >
          通信
        </h2>
        <p className="text-l mb-8">
          根据收集方式的不同，我们可能会使用您的个人信息通过新闻通讯、营销或促销材料以及其他我们认为与您相关的信息与您联系。
        </p>
        <h2
          id="cookies"
          className="mb-4 text-2xl font-semibold tracking-wide md:text-3xl"
        >
          Cookie
        </h2>
        <p className="text-l mb-8">
          Cookie是包含少量数据的文件，其中可能包含匿名唯一标识符。Cookie从网站发送到您的浏览器，并存储在您计算机的硬盘上。
        </p>
        <p className="text-l mb-8">
          与许多网站一样，我们使用"Cookie"来收集信息。您可以指示浏览器拒绝所有Cookie或在发送Cookie时提示。但是，如果您不接受Cookie，可能无法使用我们网站的某些部分。
        </p>
        <h2
          id="security"
          className="mb-4 text-2xl font-semibold tracking-wide md:text-3xl"
        >
          安全
        </h2>
        <p className="text-l mb-8">
          您的个人信息安全对我们至关重要，但请记住，任何通过互联网传输的方法或电子存储方法都不是100%安全的。虽然我们努力使用商业上可接受的手段来保护您的个人信息，但我们无法保证其绝对安全。
        </p>
        <p className="text-l mb-8">
          我们已经实施了适当的技术和组织措施，旨在保护您的信息或您作为其他企业员工角色时（"业务数据"）提供给我们、您的员工或代理人的任何数据免受意外丢失和未经授权的访问、使用、更改和披露。有关我们安全实践的更多信息，请参阅：{" "}
          <a href="https://keploy.io/docs/security" style={{color: "#FF914D"}}>
            keploy.io/docs/security
          </a>
          {""}
        </p>
        <p className="text-l mb-8">
          您信息的安全性和保密性取决于您自己。在我们为您提供（或您已选择）密码以访问我们服务的某些部分时，您有责任对此密码保密。我们要求您不要与任何人共享您的密码。
        </p>
        <h2
          id="changes-to-this-privacy-policy"
          className="mb-4 text-2xl font-semibold tracking-wide md:text-3xl"
        >
          隐私政策的变更
        </h2>
        <p className="text-l mb-8">
          本隐私政策自2024年4月28日起生效，除非未来条款有所变更，变更将在本页发布后立即生效。
        </p>
        <p className="text-l mb-8">
          我们保留随时更新或更改隐私政策的权利，您应定期查看本隐私政策。在本页对隐私政策进行任何修改后继续使用服务，即表示您确认修改并同意遵守并受修改后的隐私政策约束。
        </p>
        <p className="text-l mb-8">
          如果我们对本隐私政策做出任何重大变更，我们将通过您提供的电子邮件地址或在我们的网站上发布显著通知的方式通知您。
        </p>
        <h2
          id="contact-us"
          className="mb-4 text-2xl font-semibold tracking-wide md:text-3xl"
        >
          联系我们
        </h2>
        <p className="text-l mb-8">
          如果您对本隐私政策有任何疑问，请联系我们 -{" "}
          <a href="mailto:hello@keploy.io" style={{color: "#FF914D"}}>
            hello@keploy.io
          </a>
          。
        </p>
      </main>
    </Layout>
  );
}

export default PrivacyPolicy;