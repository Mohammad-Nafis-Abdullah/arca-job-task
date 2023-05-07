import { objData } from "../schema/data.schema";

export const Hierarchy = ({ data }: { data: objData[] }) => {
    let totalData: objData[] = [...data];

    const parent = (d: objData[]) => {
        const parent = d.filter((p: objData) => {
        return !p.parentId && p.type === "Category"
        });

        const parentTag = parent.map((p: objData, i) => {
        totalData = totalData.filter((r: objData) => {
            return r.name !== p.name;
        });
        return (
            <li key={i} className="extra-gap parent">
            <span className="box">
                {/* <h3>{p.id}</h3> */}
                <h5>{p.name}</h5>
            </span>
            <ul>{firstChild(p.id, totalData)}</ul>
            </li>
        );
        });
        return parentTag;
    };

    const firstChild = (parentId: number, d: objData[]) => {
        const childLevel_1 = d.filter((c1: objData) => {
        if (parentId === c1.parentId) {
            return true;
        } else if (
            c1.type === "Course" &&
            !c1.parentId &&
            !d.find(
            (td: objData) =>
                td.type === "Category" && td.category_id === c1.category_id
            )
        ) {
            return true;
        } else {
            return false;
        }
        });

        const childLevel_1_tag = childLevel_1.map((c1: objData, i) => {
        totalData = totalData.filter((r: objData) => {
            return r.name !== c1.name;
        });
        return (
            <li key={i}>
            <span className="box">
                {/* <h3>{c1.id}</h3> */}
                <h5>{c1.name}</h5>
            </span>
            <ul className="firstChild">{child(c1, totalData)}</ul>
            </li>
        );
        });
        return childLevel_1_tag;
    };

    const child = (p: objData, d: objData[]) => {
        const getChild = d.filter((c: objData) => {
        return p.id === c.parentId});

        const child_tag = getChild.map((c: objData, i) => {
        totalData = totalData.filter((r: objData) => {
            return r.name !== c.name;
        });
        return (
            <li key={i}>
            <span className="box">
                {/* <h3>{c.id}</h3> */}
                <h5>{c.name}</h5>
            </span>
            <ul>{child(c, totalData)}</ul>
            </li>
        );
        });

        return child_tag;
    };

    return (
        <div>
        <ul>{parent(totalData)}</ul>
        </div>
    );
};
