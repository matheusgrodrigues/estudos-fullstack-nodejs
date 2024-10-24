export interface TaskSchema {
   title: string;
}

interface DataProps {
   tasks: TaskSchema[];
}

const data: DataProps = {
   tasks: [{ title: "Fazer compras" }, { title: "Consertar o pc" }],
};

export default data;
