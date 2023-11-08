import React from "react";
import './VisionSection.css'
import Title from "../Titulo/Title";

const VisionSection = () => {
    return (
        <section className="vision">
            <div className="vision__box">
              <Title
                titleText={"Visão"}
                color="white"
                potatoClass="vision__title "
               />
                <p className="vision__text">
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                    Nisi dicta voluptates quibusdam! Quod molestias asperiores
                    culpa dolor voluptas doloribus dicta quis dignissimos
                    dolorem. Deleniti porro enim blanditiis soluta magnam
                    doloribus?
                </p>
            </div>
        </section>
    );
};

export default VisionSection;
