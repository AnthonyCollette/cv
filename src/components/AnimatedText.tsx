import { useRef, useLayoutEffect } from "react";
import gsap from "gsap";

export default function AnimatedText({
  text,
  delay,
}: {
  text: string;
  delay: number;
}) {
  const wrapperRef = useRef<HTMLSpanElement>(null); // Ref pour le span wrapper

  useLayoutEffect(() => {
    // Assurez-vous que le wrapper existe
    if (!wrapperRef.current) return;

    // Sélectionnez les spans des lettres à l'intérieur du wrapper
    const letters = wrapperRef.current.querySelectorAll("span.letter-span");
    if (letters.length === 0) return; // Si pas de lettres trouvées, sortir

    // Créez le contexte GSAP pour un nettoyage correct
    const ctx = gsap.context(() => {
      gsap.from(letters, {
        y: 20,
        opacity: 0,
        stagger: 0.025,
        ease: "power1.out", // Un ease un peu plus doux que "none"
        duration: 0.3, // Légèrement plus long pour mieux voir
        delay,
      });
    }, wrapperRef); // Scoper le contexte au wrapper

    // Fonction de nettoyage pour démonter le composant
    return () => ctx.revert();
  }, [delay]); // Ajouter delay aux dépendances

  return (
    // Span wrapper avec inline-block
    <span
      ref={wrapperRef}
      style={{ display: "inline-block", verticalAlign: "top" }}
    >
      {text.split("").map((char, i) => (
        <span key={i} className="letter-span inline-block">
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </span>
  );
}
