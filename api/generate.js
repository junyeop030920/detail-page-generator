export default async function handler(req, res) {
  try {
    if (req.method !== "POST") {
      return res.status(405).json({ result: "POST 요청만 가능합니다." });
    }

    const { name, color, fabric, size, point, target } = req.body || {};

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "user",
            content: `
너는 의류 상세페이지 배너 카피라이터야.

상품명: ${name}
색상: ${color}
원단: ${fabric}
사이즈: ${size}
셀링포인트: ${point}
타겟: ${target}

[문제]
카피
[이미지 영역]

[해결]
카피
[이미지 영역]

[비교]
카피
[이미지 영역]

[핵심포인트]
카피
[이미지 영역]
`
          }
        ]
      })
    });

    const data = await response.json();

    if (!response.ok) {
      return res.status(500).json({
        result: "OpenAI 오류: " + JSON.stringify(data)
      });
    }

    return res.status(200).json({
      result: data.choices[0].message.content
    });

  } catch (error) {
    return res.status(500).json({
      result: "서버 오류: " + error.message
    });
  }
}
